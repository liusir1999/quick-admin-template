import {
  create,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NInput,
  NButton,
  NForm,
  NFormItem,
  NCheckboxGroup,
  NCheckbox,
  NIcon,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NDropdown,
  NSpace,
  NTooltip,
  NAvatar,
  NTabs,
  NTabPane,
  NCard,
  NRow,
  NCol,
  NDrawer,
  NDrawerContent,
  NDivider,
  NSwitch,
  NBadge,
  NAlert,
  NElement,
  NTag,
  NNotificationProvider,
  NProgress,
  NDatePicker,
  NGrid,
  NGridItem,
  NList,
  NListItem,
  NThing,
  NDataTable,
  NPopover,
  NPagination,
  NSelect,
  NRadioGroup,
  NRadio,
  NSteps,
  NStep,
  NInputGroup,
  NResult,
  NDescriptions,
  NDescriptionsItem,
  NTable,
  NInputNumber,
  NLoadingBarProvider,
  NModal,
  NUpload,
  NTree,
  NSpin,
  NTimePicker,
  NBackTop,
  NSkeleton,
  NEmpty,
} from 'naive-ui'

export const useNaive = (app) => {
  const components = [
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NInput,
    NButton,
    NForm,
    NFormItem,
    NCheckboxGroup,
    NCheckbox,
    NIcon,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NBreadcrumb,
    NBreadcrumbItem,
    NDropdown,
    NSpace,
    NTooltip,
    NAvatar,
    NTabs,
    NTabPane,
    NCard,
    NRow,
    NCol,
    NDrawer,
    NDrawerContent,
    NDivider,
    NSwitch,
    NBadge,
    NAlert,
    NElement,
    NTag,
    NNotificationProvider,
    NProgress,
    NDatePicker,
    NGrid,
    NGridItem,
    NList,
    NListItem,
    NThing,
    NDataTable,
    NPopover,
    NPagination,
    NSelect,
    NRadioGroup,
    NRadio,
    NSteps,
    NStep,
    NInputGroup,
    NResult,
    NDescriptions,
    NDescriptionsItem,
    NTable,
    NInputNumber,
    NLoadingBarProvider,
    NModal,
    NUpload,
    NTree,
    NSpin,
    NTimePicker,
    NBackTop,
    NSkeleton,
    NEmpty,
  ]

  const naive = create({
    components,
  })

  app.use(naive)
}
