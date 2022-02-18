<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import japData from './data'
  import { ColumnType } from 'ant-design-vue/lib/table/interface'
  const dataSource = [
    {
      rowName: 'a'
    },
    {
      rowName: 'k'
    }
  ]

  type myParameters<T> = T extends (...args: infer P) => any ? P : never
  type rowType = myParameters<ColumnType['customRender']>[0]

  const createRenderFun = (index: number, fn?: (matchStr: string) => string) => {
    return ({ text }: rowType) => {
      const matchObj = japData[text][index]
      const matchStr = matchObj?.hiragana ?? 'not found'
      return fn ? fn(matchStr) : `${matchStr} / ${matchObj.katakana} / ${matchObj.romanTone}`
    }
  }
  const columns = [
    {
      title: '',
      dataIndex: 'rowName',
      key: 'rowName',
      width: '100px',
      customRender: createRenderFun(0, (matchStr) => matchStr + '行')
    },
    {
      title: 'あ段',
      dataIndex: 'rowName',
      key: 'あ段',
      customRender: createRenderFun(0)
    },
    {
      title: 'い段',
      dataIndex: 'rowName',
      key: 'い段',
      customRender: createRenderFun(1)
    },
    {
      title: 'う段',
      dataIndex: 'rowName',
      key: 'う段',
      customRender: createRenderFun(2)
    },
    {
      title: 'え段',
      dataIndex: 'rowName',
      key: 'え段',
      customRender: createRenderFun(3)
    },
    {
      title: 'お段',
      dataIndex: 'rowName',
      key: 'お段',
      customRender: createRenderFun(4)
    }
  ]

  const getRandom = (max: number) => Math.round(Math.random() * max)
  const isShowTest = ref(false)
  const isShowCloseTip = ref(false)
  const showText = ref({
    hiragana: '',
    katakana: '',
    romanTone: ''
  })
  const closeModal = () => {
    isShowTest.value = false
  }
  const onModalCancel = () => {
    isShowCloseTip.value = true
  }

  const getTest = () => {
    const rowName = dataSource[getRandom(dataSource.length - 1)].rowName
    const col = japData[rowName]
    const item: typeof col[0] & { [key: string]: unknown } = col[getRandom(col.length - 1)]
    showText.value = item
    isShowTest.value = true
  }
</script>

<template>
  <div>
    <ATable
      :data-source="dataSource"
      :columns="columns"
      :pagination="false"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : '')"
    />
    <AButton @click="getTest">click</AButton>
    <AModal :visible="isShowTest" title="随机一测" :keyboard="false" @cancel="onModalCancel">
      <div class="text">
        <span v-for="(val, key) in showText" :key="key">{{ val }}</span>
      </div>
      <template #footer>
        <APopconfirm
          v-model:visible="isShowCloseTip"
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="closeModal"
        >
          <AButton danger>关闭</AButton>
        </APopconfirm>
        <AButton>显示答案</AButton>
        <AButton class="next-btn" @click="getTest">下一题</AButton>
      </template>
    </AModal>
  </div>
</template>

<style scoped lang="less">
  :deep(.table-striped) {
    background-color: #fafafa;
  }
  :global(.ant-modal-mask) {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .next-btn {
    color: #fff;
    background-color: #67c23a;
  }
  .text {
    display: flex;
    justify-content: space-between;
    span {
      width: 30%;
      text-align: center;
      height: 100px;
      line-height: 100px;
      cursor: pointer;
      font-size: 30px;
      border: 1px solid #000;
      border-radius: 5px;
      box-shadow: 1px;
    }
  }
</style>
