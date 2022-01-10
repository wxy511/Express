import request from '@/utils/request'
export function py_login(data) {
  return request({
    url: '/py/login/',
    method: 'post',
    data,
  })
}

export function py_getuser(data) {
  return request({
    url: '/py/getuser/',
    method: 'post',
    data,
  })
}
export function py_logout(data) {
  return request({
    url: '/py/logout/',
    method: 'post',
    data,
  })
}
export function login(data) {
  return request({
    url: '/api/1065/',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/api/1065/',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/ ',
    method: 'post'
  })
}
//操作员或用户信息
export function getUsers(data) {
  return request({
    url: '/api/1071/',
    method: 'post',
    data,
  })
}

//记录表
export function receive(data) {
  return request({
    url: '/api/2085/',
    method: 'post',
    data,
  })
}
//获取快递公司
export function getCName(data) {
  return request({
    url: '/api/1085/',
    method: 'post',
    data,
  })
}
//模糊搜素
export function fuzzyQuery(data) {
  return request({
    url: '/api/1059/',
    method: 'post',
    data,
  })
}

//确认收件
export function confirmRece(data) {
  return request({
    url: '/api/2049/',
    method: 'post',
    data,
  })
}
//确认寄件
export function confirmMail(data) {
  return request({
    url: '/api/2051/',
    method: 'post',
    data,
  })
}
//确认取件
export function confirmTake(data) {
  return request({
    url: '/api/2050/',
    method: 'post',
    data,
  })
}
//添加快递公司
export function createCName(data) {
  return request({
    url: '/api/1081/',
    method: 'post',
    data,
  })
}
//删除快递公司
export function deleteCName(data) {
  return request({
    url: '/api/1082/',
    method: 'post',
    data,
  })
}
//修改快递公司
export function modifyCName(data) {
  return request({
    url: '/api/1083/',
    method: 'post',
    data,
  })
}
//得到员工卡号
export function getEmpBadgeID(data) {
  return request({
    url: '/api/1060/',
    method: 'post',
    data,
  })
}
//得到快件位置
export function getBranches(data) {
  return request({
    url: '/api/1047/',
    method: 'post',
    data,
  })
}
//添加更新位置信息
export function addBranch(data) {
  return request({
    url: '/api/1049/',
    method: 'post',
    data,
  })
}
//删除位置信息
export function deleteBranch(data) {
  return request({
    url: '/api/1050/',
    method: 'post',
    data,
  })
}
