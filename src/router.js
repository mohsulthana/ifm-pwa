/* eslint-disable no-lonely-if */
/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      role => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/worker'
        },
        {
          path: '/dashboard/worker',
          name: 'dashboard-worker',
          component: () => import('./views/DashboardWorker.vue'),
          meta: {
            worker: true,
            authRequired: true
          }
        },
        {
          path: '/dashboard/customer',
          name: 'dashboard-customer',
          component: () => import('./views/DashboardCustomer.vue'),
          meta: {
            customer: true,
            authRequired: true
          }
        },
        {
          path: '/dashboard/super',
          name: 'dashboard-super',
          component: () => import('./views/DashboardSuper.vue'),
          meta: {
            super: true,
            authRequired: true
          }
        },
        {
          path: '/dashboard/admin',
          name: 'dashboard-admin',
          component: () => import('./views/DashboardAdmin.vue'),
          meta: {
            admin: true,
            authRequired: true
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/UsersTable.vue'),
          meta: {
            admin: true,
            authRequired: true
          }
        },
        {
          path: '/customer',
          name: 'customer',
          component: () => import('./views/UsersTable.vue'),
          meta: {
            super: true,
            authRequired: true
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('./views/AdminTable.vue'),
          meta: {
            super: true,
            authRequired: true
          }
        },
        {
          path: '/projects',
          name: 'projects',
          component: () => import('./views/ProjectTable.vue'),
          meta: {
            admin: true,
            authRequired: true
          }
        },
        {
          path: '/complains',
          name: 'complains',
          component: () => import('./views/Complains.vue'),
          meta: {
            admin: true,
            authRequired: true
          }
        },
        {
          path: '/service',
          name: 'customer-service',
          component: () => import('./views/ServiceCustomer.vue'),
          meta: {
            customer: true,
            authRequired: true
          }
        },
        {
          path: '/admin-service',
          name: 'admin-service',
          component: () => import('./views/ServiceCustomer.vue'),
          meta: {
            super: true,
            authRequired: true
          }
        },

        // =============================================================================
        // Application Routes
        // =============================================================================
        {
          path: '/apps/todo',
          redirect: '/apps/todo/all',
          name: 'todo'
        },
        {
          path: '/apps/todo/:filter',
          component: () => import('./views/apps/todo/Todo.vue'),
          meta: {
            customer: true,
            parent: 'todo',
            no_scroll: true,
            authRequired: true
          }
        },
        {
          path: '/apps/chat',
          name: 'chat',
          component: () => import('./views/apps/chat/Chat.vue'),
          meta: {
            worker: true,
            no_scroll: true,
            authRequired: true
          }
        },
        {
          path: '/apps/email',
          redirect: '/apps/email/inbox',
          name: 'email'
        },
        {
          path: '/apps/email/:filter',
          component: () => import('./views/apps/email/Email.vue'),
          meta: {
            worker: true,
            parent: 'email',
            no_scroll: true
          }
        },
        {
          path: '/apps/calendar/vue-simple-calendar',
          name: 'calendar-simple-calendar',
          component: () => import('./views/apps/calendar/SimpleCalendar.vue'),
          meta: {
            worker: true,
            no_scroll: true,
            authRequired: true
          }
        },
        {
          path: '/task',
          name: 'task',
          component: () => import('./views/apps/todo/Todo.vue'),
          meta: {
            worker: true,
            no_scroll: true,
            authRequired: true
          }
        },
        {
          path: '/download-data',
          name: 'download',
          component: () => import('./views/Download.vue'),
          meta: {
            worker: true,
            authRequired: true
          }
        },
        {
          path: '/apps/eCommerce/shop',
          name: 'ecommerce-shop',
          component: () => import('./views/apps/eCommerce/ECommerceShop.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce' },
              { title: 'Shop', active: true }
            ],
            pageTitle: 'Shop',
            role: 'editor'
          }
        },
        {
          path: '/apps/eCommerce/wish-list',
          name: 'ecommerce-wish-list',
          component: () => import('./views/apps/eCommerce/ECommerceWishList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce', url: '/apps/eCommerce/shop' },
              { title: 'Wish List', active: true }
            ],
            pageTitle: 'Wish List',
            role: 'editor'
          }
        },
        {
          path: '/apps/eCommerce/checkout',
          name: 'ecommerce-checkout',
          component: () => import('./views/apps/eCommerce/ECommerceCheckout.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce', url: '/apps/eCommerce/shop' },
              { title: 'Checkout', active: true }
            ],
            pageTitle: 'Checkout',
            role: 'editor'
          }
        },
        /*
                  Below route is for demo purpose
                  You can use this route in your app
                    {
                        path: '/apps/eCommerce/item/',
                        name: 'ecommerce-item-detail-view',
                        redirect: '/apps/eCommerce/shop',
                    }
                */
        {
          path: '/apps/eCommerce/item/',
          redirect: '/apps/eCommerce/item/5546604'
        },
        {
          path: '/apps/eCommerce/item/:item_id',
          name: 'ecommerce-item-detail-view',
          component: () => import('./views/apps/eCommerce/ECommerceItemDetailView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce' },
              { title: 'Shop', url: { name: 'ecommerce-shop' } },
              { title: 'Item Details', active: true }
            ],
            parent: 'ecommerce-item-detail-view',
            pageTitle: 'Item Details',
            role: 'editor'
          }
        },
        {
          path: '/apps/user/user-list',
          name: 'app-user-list',
          component: () => import('@/views/apps/user/user-list/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'List', active: true }
            ],
            pageTitle: 'User List',
            role: 'editor'
          }
        },
        {
          path: '/apps/user/user-view/:userId',
          name: 'app-user-view',
          component: () => import('@/views/apps/user/UserView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'View', active: true }
            ],
            pageTitle: 'User View',
            role: 'editor'
          }
        },
        {
          path: '/apps/user/user-edit/:userId',
          name: 'app-user-edit',
          component: () => import('@/views/apps/user/user-edit/UserEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'Edit', active: true }
            ],
            pageTitle: 'User Edit',
            role: 'editor'
          }
        },
        // =============================================================================
        // UI ELEMENTS
        // =============================================================================
        {
          path: '/ui-elements/data-list/list-view',
          name: 'data-list-list-view',
          component: () => import('@/views/ui-elements/data-list/list-view/DataListListView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Data List' },
              { title: 'List View', active: true }
            ],
            pageTitle: 'List View',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/data-list/thumb-view',
          name: 'data-list-thumb-view',
          component: () => import('@/views/ui-elements/data-list/thumb-view/DataListThumbView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Data List' },
              { title: 'Thumb View', active: true }
            ],
            pageTitle: 'Thumb View',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/grid/vuesax',
          name: 'grid-vuesax',
          component: () => import('@/views/ui-elements/grid/vuesax/GridVuesax.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Grid' },
              { title: 'Vuesax', active: true }
            ],
            pageTitle: 'Grid',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/grid/tailwind',
          name: 'grid-tailwind',
          component: () => import('@/views/ui-elements/grid/tailwind/GridTailwind.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Grid' },
              { title: 'Tailwind', active: true }
            ],
            pageTitle: 'Tailwind Grid',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/colors',
          name: 'colors',
          component: () => import('./views/ui-elements/colors/Colors.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Colors', active: true }
            ],
            pageTitle: 'Colors',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/card/basic',
          name: 'basic-cards',
          component: () => import('./views/ui-elements/card/CardBasic.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Basic Cards', active: true }
            ],
            pageTitle: 'Basic Cards',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/card/statistics',
          name: 'statistics-cards',
          component: () => import('./views/ui-elements/card/CardStatistics.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Statistics Cards', active: true }
            ],
            pageTitle: 'Statistics Card',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/card/analytics',
          name: 'analytics-cards',
          component: () => import('./views/ui-elements/card/CardAnalytics.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Analytics Card', active: true }
            ],
            pageTitle: 'Analytics Card',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/card/card-actions',
          name: 'card-actions',
          component: () => import('./views/ui-elements/card/CardActions.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Card Actions', active: true }
            ],
            pageTitle: 'Card Actions',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/card/card-colors',
          name: 'card-colors',
          component: () => import('./views/ui-elements/card/CardColors.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Card Colors', active: true }
            ],
            pageTitle: 'Card Colors',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/table',
          name: 'table',
          component: () => import('./views/ui-elements/table/Table.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Table', active: true }
            ],
            pageTitle: 'Table',
            role: 'editor'
          }
        },
        {
          path: '/ui-elements/ag-grid-table',
          name: 'ag-grid-table',
          component: () => import('./views/ui-elements/ag-grid-table/AgGridTable.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'agGrid Table', active: true }
            ],
            pageTitle: 'agGrid Table',
            role: 'editor'
          }
        },

        // =============================================================================
        // COMPONENT ROUTES
        // =============================================================================
        {
          path: '/components/alert',
          name: 'component-alert',
          component: () => import('@/views/components/vuesax/alert/Alert.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Alert', active: true }
            ],
            pageTitle: 'Alert',
            role: 'editor'
          }
        },
        {
          path: '/components/avatar',
          name: 'component-avatar',
          component: () => import('@/views/components/vuesax/avatar/Avatar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Avatar', active: true }
            ],
            pageTitle: 'Avatar',
            role: 'editor'
          }
        },
        {
          path: '/components/breadcrumb',
          name: 'component-breadcrumb',
          component: () => import('@/views/components/vuesax/breadcrumb/Breadcrumb.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Breadcrumb', active: true }
            ],
            pageTitle: 'Breadcrumb',
            role: 'editor'
          }
        },
        {
          path: '/components/button',
          name: 'component-button',
          component: () => import('@/views/components/vuesax/button/Button.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Button', active: true }
            ],
            pageTitle: 'Button',
            role: 'editor'
          }
        },
        {
          path: '/components/button-group',
          name: 'component-button-group',
          component: () => import('@/views/components/vuesax/button-group/ButtonGroup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Button Group', active: true }
            ],
            pageTitle: 'Button Group',
            role: 'editor'
          }
        },
        {
          path: '/components/chip',
          name: 'component-chip',
          component: () => import('@/views/components/vuesax/chip/Chip.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Chip', active: true }
            ],
            pageTitle: 'Chip',
            role: 'editor'
          }
        },
        {
          path: '/components/collapse',
          name: 'component-collapse',
          component: () => import('@/views/components/vuesax/collapse/Collapse.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Collapse', active: true }
            ],
            pageTitle: 'Collapse',
            role: 'editor'
          }
        },
        {
          path: '/components/dialogs',
          name: 'component-dialog',
          component: () => import('@/views/components/vuesax/dialogs/Dialogs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Dialogs', active: true }
            ],
            pageTitle: 'Dialogs',
            role: 'editor'
          }
        },
        {
          path: '/components/divider',
          name: 'component-divider',
          component: () => import('@/views/components/vuesax/divider/Divider.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Divider', active: true }
            ],
            pageTitle: 'Divider',
            role: 'editor'
          }
        },
        {
          path: '/components/dropdown',
          name: 'component-drop-down',
          component: () => import('@/views/components/vuesax/dropdown/Dropdown.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Dropdown', active: true }
            ],
            pageTitle: 'Dropdown',
            role: 'editor'
          }
        },
        {
          path: '/components/list',
          name: 'component-list',
          component: () => import('@/views/components/vuesax/list/List.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'List', active: true }
            ],
            pageTitle: 'List',
            role: 'editor'
          }
        },
        {
          path: '/components/loading',
          name: 'component-loading',
          component: () => import('@/views/components/vuesax/loading/Loading.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Loading', active: true }
            ],
            pageTitle: 'Loading',
            role: 'editor'
          }
        },
        {
          path: '/components/navbar',
          name: 'component-navbar',
          component: () => import('@/views/components/vuesax/navbar/Navbar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Navbar', active: true }
            ],
            pageTitle: 'Navbar',
            role: 'editor'
          }
        },
        {
          path: '/components/notifications',
          name: 'component-notifications',
          component: () => import('@/views/components/vuesax/notifications/Notifications.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Notifications', active: true }
            ],
            pageTitle: 'Notifications',
            role: 'editor'
          }
        },
        {
          path: '/components/pagination',
          name: 'component-pagination',
          component: () => import('@/views/components/vuesax/pagination/Pagination.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Pagination', active: true }
            ],
            pageTitle: 'Pagination',
            role: 'editor'
          }
        },
        {
          path: '/components/popup',
          name: 'component-popup',
          component: () => import('@/views/components/vuesax/popup/Popup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Popup', active: true }
            ],
            pageTitle: 'Popup',
            role: 'editor'
          }
        },
        {
          path: '/components/progress',
          name: 'component-progress',
          component: () => import('@/views/components/vuesax/progress/Progress.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Progress', active: true }
            ],
            pageTitle: 'Progress',
            role: 'editor'
          }
        },
        {
          path: '/components/sidebar',
          name: 'component-sidebar',
          component: () => import('@/views/components/vuesax/sidebar/Sidebar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Sidebar', active: true }
            ],
            pageTitle: 'Sidebar',
            role: 'editor'
          }
        },
        {
          path: '/components/slider',
          name: 'component-slider',
          component: () => import('@/views/components/vuesax/slider/Slider.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Slider', active: true }
            ],
            pageTitle: 'Slider',
            role: 'editor'
          }
        },
        {
          path: '/components/tabs',
          name: 'component-tabs',
          component: () => import('@/views/components/vuesax/tabs/Tabs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Tabs', active: true }
            ],
            pageTitle: 'Tabs',
            role: 'editor'
          }
        },
        {
          path: '/components/tooltip',
          name: 'component-tooltip',
          component: () => import('@/views/components/vuesax/tooltip/Tooltip.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Tooltip', active: true }
            ],
            pageTitle: 'Tooltip',
            role: 'editor'
          }
        },
        {
          path: '/components/upload',
          name: 'component-upload',
          component: () => import('@/views/components/vuesax/upload/Upload.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Upload', active: true }
            ],
            pageTitle: 'Upload',
            role: 'editor'
          }
        },


        // =============================================================================
        // FORMS
        // =============================================================================
        // =============================================================================
        // FORM ELEMENTS
        // =============================================================================
        {
          path: '/forms/form-elements/select',
          name: 'form-element-select',
          component: () => import('./views/forms/form-elements/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Select', active: true }
            ],
            pageTitle: 'Select',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/switch',
          name: 'form-element-switch',
          component: () => import('./views/forms/form-elements/switch/Switch.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Switch', active: true }
            ],
            pageTitle: 'Switch',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/checkbox',
          name: 'form-element-checkbox',
          component: () => import('./views/forms/form-elements/checkbox/Checkbox.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Checkbox', active: true }
            ],
            pageTitle: 'Checkbox',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/radio',
          name: 'form-element-radio',
          component: () => import('./views/forms/form-elements/radio/Radio.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Radio', active: true }
            ],
            pageTitle: 'Radio',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/input',
          name: 'form-element-input',
          component: () => import('./views/forms/form-elements/input/Input.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Input', active: true }
            ],
            pageTitle: 'Input',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/number-input',
          name: 'form-element-number-input',
          component: () => import('./views/forms/form-elements/number-input/NumberInput.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Number Input', active: true }
            ],
            pageTitle: 'Number Input',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-elements/textarea',
          name: 'form-element-textarea',
          component: () => import('./views/forms/form-elements/textarea/Textarea.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Textarea', active: true }
            ],
            pageTitle: 'Textarea',
            role: 'editor'
          }
        },
        // -------------------------------------------------------------------------------------------------------------------------------------------
        {
          path: '/forms/form-layouts',
          name: 'forms-form-layouts',
          component: () => import('@/views/forms/FormLayouts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Forms' },
              { title: 'Form Layouts', active: true }
            ],
            pageTitle: 'Form Layouts',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-wizard',
          name: 'extra-component-form-wizard',
          component: () => import('@/views/forms/form-wizard/FormWizard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Wizard', active: true }
            ],
            pageTitle: 'Form Wizard',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-validation',
          name: 'extra-component-form-validation',
          component: () => import('@/views/forms/form-validation/FormValidation.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Validation', active: true }
            ],
            pageTitle: 'Form Validation',
            role: 'editor'
          }
        },
        {
          path: '/forms/form-input-group',
          name: 'extra-component-form-input-group',
          component: () => import('@/views/forms/form-input-group/FormInputGroup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Input Group', active: true }
            ],
            pageTitle: 'Form Input Group',
            role: 'editor'
          }
        },

        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            role: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            role: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            role: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            role: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            role: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            role: 'editor'
          }
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true }
            ],
            pageTitle: 'Search',
            role: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            role: 'editor'
          }
        },

        // =============================================================================
        // CHARTS & MAPS
        // =============================================================================
        {
          path: '/charts-and-maps/charts/apex-charts',
          name: 'extra-component-charts-apex-charts',
          component: () => import('@/views/charts-and-maps/charts/apex-charts/ApexCharts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'Apex Charts', active: true }
            ],
            pageTitle: 'Apex Charts',
            role: 'editor'
          }
        },
        {
          path: '/charts-and-maps/charts/chartjs',
          name: 'extra-component-charts-chartjs',
          component: () => import('@/views/charts-and-maps/charts/chartjs/Chartjs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'chartjs', active: true }
            ],
            pageTitle: 'chartjs',
            role: 'editor'
          }
        },
        {
          path: '/charts-and-maps/charts/echarts',
          name: 'extra-component-charts-echarts',
          component: () => import('@/views/charts-and-maps/charts/echarts/Echarts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'echarts', active: true }
            ],
            pageTitle: 'echarts',
            role: 'editor'
          }
        },
        {
          path: '/charts-and-maps/maps/google-map',
          name: 'extra-component-maps-google-map',
          component: () => import('@/views/charts-and-maps/maps/google-map/GoogleMap.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'Google Map', active: true }
            ],
            pageTitle: 'Google Map',
            role: 'editor'
          }
        },


        // =============================================================================
        // EXTENSIONS
        // =============================================================================
        {
          path: '/extensions/select',
          name: 'extra-component-select',
          component: () => import('@/views/components/extra-components/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Select', active: true }
            ],
            pageTitle: 'Select',
            role: 'editor'
          }
        },
        {
          path: '/extensions/quill-editor',
          name: 'extra-component-quill-editor',
          component: () => import('@/views/components/extra-components/quill-editor/QuillEditor.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Quill Editor', active: true }
            ],
            pageTitle: 'Quill Editor',
            role: 'editor'
          }
        },
        {
          path: '/extensions/drag-and-drop',
          name: 'extra-component-drag-and-drop',
          component: () => import('@/views/components/extra-components/drag-and-drop/DragAndDrop.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Drag & Drop', active: true }
            ],
            pageTitle: 'Drag & Drop',
            role: 'editor'
          }
        },
        {
          path: '/extensions/datepicker',
          name: 'extra-component-datepicker',
          component: () => import('@/views/components/extra-components/datepicker/Datepicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datepicker', active: true }
            ],
            pageTitle: 'Datepicker',
            role: 'editor'
          }
        },
        {
          path: '/extensions/datetime-picker',
          name: 'extra-component-datetime-picker',
          component: () => import('@/views/components/extra-components/datetime-picker/DatetimePicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datetime Picker', active: true }
            ],
            pageTitle: 'Datetime Picker',
            role: 'editor'
          }
        },
        {
          path: '/extensions/access-control',
          name: 'extra-component-access-control',
          component: () => import('@/views/components/extra-components/access-control/AccessControl.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Access Control', active: true }
            ],
            pageTitle: 'Access Control',
            role: 'editor'
          }
        },
        {
          path: '/extensions/i18n',
          name: 'extra-component-i18n',
          component: () => import('@/views/components/extra-components/I18n.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'I18n', active: true }
            ],
            pageTitle: 'I18n',
            role: 'editor'
          }
        },
        {
          path: '/extensions/carousel',
          name: 'extra-component-carousel',
          component: () => import('@/views/components/extra-components/carousel/Carousel.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Carousel', active: true }
            ],
            pageTitle: 'Carousel',
            role: 'editor'
          }
        },
        {
          path: '/extensions/clipboard',
          name: 'extra-component-clipboard',
          component: () => import('@/views/components/extra-components/clipboard/Clipboard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Clipboard', active: true }
            ],
            pageTitle: 'Clipboard',
            role: 'editor'
          }
        },
        {
          path: '/extensions/context-menu',
          name: 'extra-component-context-menu',
          component: () => import('@/views/components/extra-components/context-menu/ContextMenu.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Context Menu', active: true }
            ],
            pageTitle: 'Context Menu',
            role: 'editor'
          }
        },
        {
          path: '/extensions/star-ratings',
          name: 'extra-component-star-ratings',
          component: () => import('@/views/components/extra-components/star-ratings/StarRatings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Star Ratings', active: true }
            ],
            pageTitle: 'Star Ratings',
            role: 'editor'
          }
        },
        {
          path: '/extensions/autocomplete',
          name: 'extra-component-autocomplete',
          component: () => import('@/views/components/extra-components/autocomplete/Autocomplete.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Autocomplete', active: true }
            ],
            pageTitle: 'Autocomplete',
            role: 'editor'
          }
        },
        {
          path: '/extensions/tree',
          name: 'extra-component-tree',
          component: () => import('@/views/components/extra-components/tree/Tree.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Tree', active: true }
            ],
            pageTitle: 'Tree',
            role: 'editor'
          }
        },
        {
          path: '/import-export/import',
          name: 'import-excel',
          component: () => import('@/views/components/extra-components/import-export/Import.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Import', active: true }
            ],
            pageTitle: 'Import Excel',
            role: 'editor'
          }
        },
        {
          path: '/import-export/export',
          name: 'export-excel',
          component: () => import('@/views/components/extra-components/import-export/Export.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export', active: true }
            ],
            pageTitle: 'Export Excel',
            role: 'editor'
          }
        },
        {
          path: '/import-export/export-selected',
          name: 'export-excel-selected',
          component: () => import('@/views/components/extra-components/import-export/ExportSelected.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export Selected', active: true }
            ],
            pageTitle: 'Export Excel',
            role: 'editor'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue')
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            role: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            role: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

// router.beforeEach((to, from, next) => {
//   let userInfo = ''
//   const token = localStorage.getItem('accessToken')
//   if (token) {
//     userInfo = JSON.parse(atob(token.split('.')[1]))
//   }

//   if (to.matched.some(record => record.meta.authRequired)) {
//     if (!userInfo || userInfo === null) {
//       next({ path: '/login' })
//     } else {
//       if (to.matched.some(record => record.meta.worker)) {
//         if (userInfo.data.role === 'worker') {
//           next()
//         } else {
//           next({ path: '/login' })
//         }
//       } else if (to.matched.some(record => record.meta.customer)) {
//         if (userInfo.data.role === 'customer' || userInfo.data.role === 'admin') {
//           next()
//         } else {
//           next({ path: '/login' })
//         }
//       } else if (to.matched.some(record => record.meta.admin)) {
//         if (userInfo.data.role === 'admin') {
//           next()
//         } else {
//           next({ path: '/login' })
//         }
//       } else if (to.matched.some(record => record.meta.super)) {
//         if (userInfo.data.role === 'super') {
//           next()
//         } else {
//           next({ path: '/login' })
//         }
//       } else {
//         next()
//       }
//     }
//   } else {
//     // if (userInfo.data.role === 'worker') {
//     //   router.push({
//     //     path: '/dashboard/worker'
//     //   })
//     // } else if (userInfo.data.role === 'customer') {
//     //   router.push({
//     //     path: '/dashboard/customer'
//     //   })
//     // } else if (userInfo.data.role === 'admin') {
//     //   router.push({
//     //     path: '/dashboard/admin'
//     //   })
//     // } else if (userInfo.data.role === 'super') {
//     //   router.push({
//     //     path: '/dashboard/super'
//     //   })
//     // } else {
//     //   next()
//     // }
//     next()
//   }
// })

export default router
