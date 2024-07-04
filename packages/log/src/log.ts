import { isEmptyArray, isEmptyString } from '@xparcai-utils/is'
import { template as templateFn } from '@xparcai-utils/string'

let _prefix: string = ''

/**
 * 设置打印信息前缀
 * @param prefix 打印信息前缀
 */
function setPrefix(prefix: string) {
  _prefix = prefix
}

const _typeDefault = {
  success: '#67C23A',
  error: '#F56C6C',
  warning: '#E6A23C',
  info: '#909399',
}
let _type = { ..._typeDefault }

type Type = keyof typeof _type

/**
 * 设置自定义类型
 * @param type 自定义类型
 */
function setType(type: Record<Type, string>) {
  _type = { ..._typeDefault, ...type }
}

interface PresetOptions {
  color?: string
  borderColor?: string
  borderStyle?: string
  borderWidth?: string
  fontSize?: string
  padding?: string
  borderRadius?: string
  backgroundColor?: string
}

/**
 * 预设打印输出样式
 */
const _presetOptions: PresetOptions = {
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '2px 0 0 2px',
  fontSize: '12px',
  padding: '1px',
}

/**
 * 获取类型对应的配置项
 */
function getTypeOptions(type: Type) {
  const typeColor = _type[type]
  return {
    ..._presetOptions,
    color: typeColor,
    borderColor: typeColor,
    backgroundColor: typeColor,
  }
}

const _template: string = '%c {prefix} %c {content} %c'

/**
 * log type 实现
 * @param type 类型
 * @param content 打印内容
 * @param prefix 打印前缀
 */
function _log(type: Type, content: unknown, prefix: string = _prefix) {
  let template = _template
  const typeOptions = getTypeOptions(type)
  const contentStyle = templateFn(
    `
      border-width: {borderWidth}; 
      border-style: {borderStyle}; 
      border-color: {borderColor}; 
      border-radius: {borderRadius}; 
      color: {color}; 
      padding: {padding};
    `,
    typeOptions,
  )
  if (isEmptyString(_prefix) && isEmptyString(prefix)) {
    template = template.replace('%c {prefix} ', '')
    template = templateFn(_template, { prefix, content: content as string })
    console.log(template, contentStyle, 'background:transparent')
  }
  else {
    const prefixStyle = templateFn(
      `
        border-width: {borderWidth}; 
        border-style: {borderStyle}; 
        border-color: {borderColor}; 
        border-radius: {borderRadius}; 
        color: #FFFFFF; 
        background-color: {backgroundColor}; 
        padding: {padding};
      `,
      typeOptions,
    )
    console.log(template, prefixStyle, contentStyle, 'background:transparent')
  }
}

interface tableColum {
  title: string
  key: string
}
interface tableOption {
  color?: string
  backgroundColor?: string
  padding?: string
}

function table(tableData: any[], tableColumns: tableColum[], headerOption: tableOption = {}, bodyOption: tableOption = {}) {
  let canUse = true
  let cantUseMsg = ''
  if (!isEmptyArray(tableData)) {
    cantUseMsg = '请传入正确的table数据'
    return
  }
  if (!isEmptyArray(tableColumns)) {
    cantUseMsg = '请传入正确的tableColumns数据'
    return
  }
  let theaderStr: string = ''
  const tHeaderArr: string[] = []
  const tBodyArr: string[] = []
  const defaultHeaderOption: tableOption = {
    color: 'white',
    backgroundColor: 'black',
    padding: '2px 10px',
  }
  const optionHeader: tableOption = Object.assign(defaultHeaderOption, headerOption)
  const defaultBodyOption: tableOption = {
    color: 'black',
    backgroundColor: 'lightgray',
    padding: '2px 10px',
  }
  const optionBody: tableOption = Object.assign(defaultBodyOption, bodyOption)

  for (let index = 0; index < tableColumns.length; index++) {
    const item = tableColumns[index]
    if (isEmptyString(item.title) || isEmptyString(item.key)) {
      cantUseMsg = '请传入正确的tableColumns数据'
      canUse = false
      break
    }
    else {
      theaderStr = `${theaderStr}%c ${item.title}`
      tHeaderArr.push(`color: ${optionHeader.color}; background-color: ${optionHeader.backgroundColor}; padding: ${optionHeader.padding};`)
      tBodyArr.push(`color: ${optionBody.color}; background-color: ${optionBody.backgroundColor}; padding: ${optionBody.padding};`)
    }
  }
  if (!canUse) {
    _log('error', '错误', cantUseMsg)
    return
  }
  // 输出头部
  console.log(theaderStr, ...tHeaderArr)
  // 循环输出body内容
  tableData.forEach((row: any) => {
    let tBodyStr = ''
    tableColumns.forEach((item) => {
      tBodyStr = `${tBodyStr}%c ${row[item.key]}`
    })
    console.log(tBodyStr, ...tBodyArr)
  })
}
function picture(url: string, scale = 1) {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    if (ctx) {
      c.width = img.width
      c.height = img.height
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.drawImage(img, 0, 0)
      const dataUri = c.toDataURL('image/png')

      console.log(
          `%c sup?`,
          `
            font-size: 1px;
            padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
            background-image: url(${dataUri});
            background-repeat: no-repeat;
            background-size: ${img.width * scale}px ${img.height * scale}px;
            color: transparent;
          `,
      )
    }
  }
  img.src = url
}

const log = {
  success: (content: unknown, prefix: string = _prefix) => _log('success', content, prefix),
  error: (content: unknown, prefix: string = _prefix) => _log('error', content, prefix),
  warning: (content: unknown, prefix: string = _prefix) => _log('warning', content, prefix),
  info: (content: unknown, prefix: string = _prefix) => _log('info', content, prefix),
  table,
  picture,
  setPrefix,
  setType,
}

export { log }
