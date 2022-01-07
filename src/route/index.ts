export default [
  {
    path: '/',
    redirect: '/a'
  },
  {
    path: '/a',
    component: () => import('@/views/a.vue'),
    name: 'a'
  },
  {
    path: '/b',
    component: () => import('@/views/b.vue'),
    name: 'b'
  }
]
