const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入查询的权限介绍'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
