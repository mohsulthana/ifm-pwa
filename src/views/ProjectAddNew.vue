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
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-textarea
                v-validate="'required'"
                name="description"
                class="w-full mb-4 mt-5"
                label="Project Description"
                v-model="project.description"
                :color="validateForm ? 'success' : 'danger'"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <v-select placeholder="Choose customer" class="w-full mb-4 mt-5" :reduce="customer => customer.user_id" v-model="project.customer" label="name" :options="customer"></v-select>
              <!-- <vs-select
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
              </vs-select> -->
              <small v-if="customer.length == 0" class="text-danger"
                >You dont' have any customer. Please add new one before
                continue</small
              >
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <flat-pickr
                class="mt-5 w-1/2"
                :config="configFromdateTimePicker"
                v-model="fromDate"
                placeholder="From Date"
                @on-change="onFromChange"
              />
              <flat-pickr
                class="mt-5 w-1/2"
                :config="configTodateTimePicker"
                v-model="toDate"
                placeholder="To Date"
                @on-change="onToChange"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <v-select placeholder="Choose worker" multiple class="w-full mb-4 mt-5" :reduce="worker => worker.worker_id" v-model="project.worker" label="name" :options="worker"></v-select>
              <!-- <vs-select
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
              </vs-select> -->
              <small v-if="worker.length == 0" class="text-danger"
                >You dont' have any worker. Please add new one before
                continue</small
              >
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-upload limit="1" @change="convertImage" show-upload-button />
              <small for="projectImage">Upload Project Image</small>
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
import vSelect from 'vue-select'

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
    flatPickr,
    vSelect
  },
  computed: {
    validateForm () {
      return (
        !this.errors.any() &&
        this.project.project !== '' &&
        this.project.customer !== ''
      )
    }
  },
  methods: {
    onFromChange (selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
    },
    onToChange (selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr)
    },
    convertImage (event, target) {
      this.project.image = target[0]
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
      this.$validator
        .validateAll()
        .then((result) => {
          if (result) {
            const data = new FormData()
            data.append('project', this.project.project)
            data.append('description', this.project.description)
            data.append('customer', this.project.customer)
            data.append('service_id', this.$store.state.AppActiveUser.service)
            data.append(
              'tag',
              this.projectTag === null ? null : this.projectTag.id
            )
            data.append('start_date', this.fromDate)
            data.append('end_date', this.toDate)
            data.append('image', this.project.image)

            this.$store
              .dispatch('project/addProject', data)
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
                console.error(error)
                this.$vs.notify({
                  title: 'Error',
                  text: error.data.message,
                  icon: 'error',
                  color: 'danger'
                })
              })
            // this.clearFields()
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchCustomer () {
      axios
        .get('api/users')
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
