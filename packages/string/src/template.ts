import { isFunction, isObject } from '@xparcai-utils/is'

type Value = string | number | bigint | undefined | null
type ValueObject = Record<string | number, Value>

/**
 * 匿名字符串模板替换
 * @param tp 字符串模板
 * @param args 占位值
 * @returns 替换后的字符串
 */
export function template(tp: string, ...args: Value[]): string

/**
 * 混合字符串模板替换
 * @param tp 字符串模板
 * @param values 具名占位值集合，未提供值的统一使用 other 值填充
 * @param other 匿名占位值，支持字符串和函数
 * @returns 替换后的字符串
 */
export function template(tp: string, values: ValueObject | ((key: string) => ValueObject), other?: string | ((key: string) => string)): string

/**
 * 实现函数
 */
export function template(tp: string, ...args: any[]): string {
  const [values, other] = args
  if (isFunction(values) || isObject(values)) {
    return tp.replace(/\{(\w+)\}/g, (_, key) => {
      const _values = isFunction(values) ? values(key) : values
      return _values[key] || ((isFunction(other) ? other(key) : other) ?? key)
    })
  }
  else {
    return tp.replace(/\{(\d+)\}/g, (_, key) => {
      const index = Number(key)
      if (Number.isNaN(index))
        return key
      return args[index]
    })
  }
}
