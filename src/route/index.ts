export default [
  {
    path: '/',
    redirect: '/japanese'
  },
  {
    path: '/sign',
    component: () => import('@/views/Sign/index.vue'),
    name: 'sign'
  },
  {
    path: '/japanese',
    component: () => import('@/views/Japanese/index.vue'),
    name: 'japanese'
  }
]
