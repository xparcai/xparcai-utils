import { isEmptyArray, isEmptyString } from '@xparcai-utils/is'
type textOption = {
  color?: string,
  borderColor?: string,
  borderStyle?: string,
  borderWidth?: string,
  fontSize?: string,
  padding?: string,
  borderRadius?: string,
  backgroundColor?: string
}
type tableColum = {
  title: string
  key: string
}
type tableOption = {
  color?: string
  backgroundColor?: string
  padding?: string
}
function prettyLog() {
  const prettyPrint = (title: string, text: string, option: textOption) => {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${option.backgroundColor};border:${option.borderWidth} ${option.borderStyle} ${option.borderColor}; padding: ${option.padding}; border-radius: ${option.borderRadius}; color: #fff;`,
      `border:${option.borderWidth} ${option.borderStyle} ${option.borderColor}; padding: ${option.padding}; border-radius: ${option.borderRadius}; color: ${option.color};`,
      'background:transparent'
    );
  };
  const info = (textOrTitle: string, content: string = '', option: textOption = {}) => {
    const title = isEmptyString(content) ? 'Info' : textOrTitle;
    const text = isEmptyString(content) ? textOrTitle : content;
    const defaultOption = {
      color: '#909399',
      borderColor: '#909399',
      borderStyle: 'solid',
      borderWidth: '1px',
      fontSize: '12px',
      padding: '1px',
      borderRadius: '2px 0 0 2px',
      backgroundColor: '#909399'
    }
    const textOption = Object.assign(defaultOption, option)
    prettyPrint(title, text, textOption);
  };
  const error = (textOrTitle: string, content: string = '', option: textOption = {}) => {
    const title = isEmptyString(content) ? 'Error' : textOrTitle;
    const text = isEmptyString(content) ? textOrTitle : content;
    const defaultOption = {
      color: '#F56C6C',
      borderColor: '#F56C6C',
      borderStyle: 'solid',
      borderWidth: '1px',
      fontSize: '12px',
      padding: '1px',
      borderRadius: '2px 0 0 2px',
      backgroundColor: '#F56C6C'
    }
    const textOption = Object.assign(defaultOption, option)
    prettyPrint(title, text, textOption);
  };
  const warning = (textOrTitle: string, content:string = '', option: textOption = {}) => {
    const title = isEmptyString(content) ? 'Warning' : textOrTitle;
    const text = isEmptyString(content) ? textOrTitle : content;
    const defaultOption = {
      color: '#E6A23C',
      borderColor: '#E6A23C',
      borderStyle: 'solid',
      borderWidth: '1px',
      fontSize: '12px',
      padding: '1px',
      borderRadius: '2px 0 0 2px',
      backgroundColor: '#E6A23C'
    }
    const textOption = Object.assign(defaultOption, option)
    prettyPrint(title, text, textOption);
  };
  const success = (textOrTitle: string, content:string = '', option: textOption = {}) => {
    const title = isEmptyString(content) ? 'Success ' : textOrTitle;
    const text = isEmptyString(content) ? textOrTitle : content;
    const defaultOption = {
      color: '#67C23A',
      borderColor: '#67C23A',
      borderStyle: 'solid',
      borderWidth: '1px',
      fontSize: '12px',
      padding: '1px',
      borderRadius: '2px 0 0 2px',
      backgroundColor: '#67C23A'
    }
    const textOption = Object.assign(defaultOption, option)
    prettyPrint(title, text, textOption);
  };
  const table = (tableData: any[], tableColumns: tableColum[], headerOption: tableOption = {}, bodyOption: tableOption = {}) => {
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
    let tHeaderArr: string[] = []
    let tBodyArr: string[] = []
    const defaultHeaderOption: tableOption = {
      color: 'white',
      backgroundColor: 'black',
      padding: '2px 10px'
    }
    const optionHeader : tableOption = Object.assign(defaultHeaderOption, headerOption)
    const defaultBodyOption: tableOption = {
      color: 'black',
      backgroundColor: 'lightgray',
      padding: '2px 10px'
    }
    const optionBody: tableOption = Object.assign(defaultBodyOption, bodyOption)
    
    for (let index = 0; index < tableColumns.length; index++) {
      const item = tableColumns[index];
      if (isEmptyString(item.title) || isEmptyString(item.key)) {
        cantUseMsg = '请传入正确的tableColumns数据'
        canUse = false
        break
      } else {
        theaderStr = theaderStr + `%c ${item.title}`
        tHeaderArr.push(`color: ${optionHeader.color}; background-color: ${optionHeader.backgroundColor}; padding: ${optionHeader.padding};`)
        tBodyArr.push(`color: ${optionBody.color}; background-color: ${optionBody.backgroundColor}; padding: ${optionBody.padding};`)
      }
    }
    if (!canUse) {
      error('错误', cantUseMsg)
      return
    }
    // 输出头部
    console.log(theaderStr,...tHeaderArr);
    // 循环输出body内容
    tableData.forEach((row: any) => {
      let tBodyStr = ''
      tableColumns.forEach(item => {
        tBodyStr = tBodyStr + `%c ${row[item.key]}`
      })
      console.log(tBodyStr, ...tBodyArr);
    });
  };
  const picture = (url: string, scale = 1) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL('image/png');

        console.log(
          `%c sup?`,
          `font-size: 1px;
                  padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                  background-image: url(${dataUri});
                  background-repeat: no-repeat;
                  background-size: ${img.width * scale}px ${img.height * scale}px;
                  color: transparent;
                  `
        );
      }
    };
    img.src = url;
  };

  return {
    info,
    error,
    warning,
    success,
    picture,
    table
  };
}

export const log = prettyLog();