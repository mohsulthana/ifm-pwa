<template>
  <div>
    <vs-button
      @click="activePrompt = true"
      class="w-full"
      icon="icon-plus"
      icon-pack="feather"
      >Project</vs-button
    >
    <vs-prompt
      title="Add New Project"
      accept-text="Add"
      button-cancel="border"
      @cancel="clearFields"
      @accept="createProject"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div class="calendar__label-container flex">
        <vs-chip
          v-if="projectTag != null"
          class="text-white"
          :style="{ background: projectTag.col }"
          >{{ projectTag.val }}</vs-chip
        >

        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="ml-auto my-2 cursor-pointer"
        >
          <feather-icon
            icon="TagIcon"
            svgClasses="h-5 w-5"
            class="cursor-pointer"
            @click.prevent
          ></feather-icon>

          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item
              v-for="(label, index) in tags"
              :key="index"
              @click="
                changeProjectTag(label.tag_name, label.tag_color, label.id)
              "
            >
              <div
                class="h-3 w-3 inline-block rounded-full mr-2"
                :style="{ background: label.tag_color }"
              ></div>
              <span>{{ label.tag_name }}</span>
            </vs-dropdown-item>

            <vs-dropdown-item>
              <div
                @click="projectTag = null"
                class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"
              ></div>
              <span>None</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                v-validate="'required'"
                name="project"
                class="w-full mb-4 mt-5"
                placeholder="Project Name"
                v-model="project.project"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                v-validate="'required'"
                name="description"
                class="w-full mb-4 mt-5"
                label="Project Description"
                v-model="project.description"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-select
                class="w-full mb-4 mt-5"
                label="Customer"
                v-model="project.customer"
              >
                <vs-select-item
                  :key="index"
                  :value="item.user_id"
                  :text="item.name"
                  v-for="(item, index) in customer"
                />
              </vs-select>
              <flat-pickr class="mt-5 w-1/2" :config="configFromdateTimePicker" v-model="fromDate" placeholder="From Date" @on-change="onFromChange" />
              <flat-pickr class="mt-5 w-1/2" :config="configTodateTimePicker" v-model="toDate" placeholder="To Date" @on-change="onToChange" />
              <vs-select
                multiple
                autocomplete
                class="w-full mb-4 mt-5"
                label="Worker"
                v-model="project.worker_id"
              >
                <vs-select-item
                  :value="item.worker_id"
                  :text="item.name"
                  v-for="(item, index) in worker"
                  :key="index"
                />
              </vs-select>
              <vs-upload
                limit="1"
                @change="connvertImage"
                show-upload-button
              />
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import axios from '@/axios'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  data () {
    return {
      customer: [],
      worker: [],
      projectTag: null,
      activePrompt: false,
      tags: [],
      project: {
        project: '',
        description: '',
        customer: '',
        image: '',
        worker_id: []
      },
      users: [],
      fromDate: null,
      toDate: null,
      configFromdateTimePicker: {
        minDate: new Date(),
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: null
      }
    }
  },
  components: {
    flatPickr
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.project.project !== ''
    }
  },
  methods: {
    onFromChange (selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
    },
    onToChange (selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr)
    },
    connvertImage (event, target) {
      const self = this

      const reader = new FileReader()

      reader.readAsDataURL(target[0])
      reader.onload = function (event) {
        self.project.image = event.target.result
      }
    },
    clearFields () {
      // Object.assign(this.project, {
      //   project: '',
      //   description: '',
      //   customer: '',
      //   percent: 0,
      //   service_id: this.$store.state.AppActiveUser.service
      // })
    },
    createProject () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const project = {
            project: this.project.project,
            description: this.project.description,
            customer: this.project.customer,
            image: this.project.image,
            service_id: this.$store.state.AppActiveUser.service,
            tag: this.projectTag === null ? null : this.projectTag.id,
            start_date: this.fromDate,
            end_date: this.toDate,
            service: this.$store.state.AppActiveUser.service
          }
          this.$store
            .dispatch('project/addProject', Object.assign({}, project))
            .then((response) => {
              const project_id = response.data.id
              const worker = this.project.worker_id
              for (let i = 0; i < worker.length; i++) {
                const element = worker[i]
                const project = {
                  project_id,
                  worker_id: element
                }
                this.$store.dispatch(
                  'project/createProjectWorker',
                  Object.assign({}, project)
                )
              }
              this.$vs.notify({
                title: 'Success',
                text: 'Project successfully created!',
                icon: 'check_box',
                color: 'success'
              })
            })
            .catch((error) => {
              this.$vs.notify({
                title: 'Error',
                text: error.data.message,
                icon: 'error',
                color: 'danger'
              })
            })
          this.clearFields()
        }
      })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchCustomer () {
      axios.get('api/users')
        .then((response) => {
          this.customer = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchTags () {
      axios
        .get('api/tag')
        .then((response) => {
          this.tags = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    changeProjectTag (label, color, tagId) {
      this.projectTag = {
        val: label,
        col: color,
        id: tagId
      }
    },
    fetchWorker () {
      this.$store.dispatch('user/fetchWorkers').then((response) => {
        this.worker = response.data
      })
    }
  },
  mounted () {
    this.fetchCustomer()
    this.fetchWorker()
    this.fetchTags()
  }
}
</script>
