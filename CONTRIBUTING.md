<p align="center">
  <img src="https://img.shields.io/badge/npm-v0.0.1-brightgreen" />
  <img src="https://img.shields.io/badge/-Rollup-34495e?logo=rollup" />
  <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white" alt="Prettier">
  <img src="https://img.shields.io/badge/license-Apache-blue.svg" alt="Apache">
<p>

# xparcai-utils

<p><b>小趴菜，你是否想在你的简历上添上一笔开源项目的记录？</b></p>
<p>跟紧我的步伐，手摸手教你如何加入小趴菜工具的开发</p>
<p>这也基本是所有的开源项目加入的必须步骤</p>

# 操作步骤

1. fork仓库

```
将小趴菜fork到你的仓库下，然后拉代码
```

2. 创建新分支，不建议在主分支更改，会影响到你后期的pr操作
3. 打开你的编辑器并导入项目
4. 开发流程
   - 安装依赖
     ```
     根目录下执行pnpm install命令，他会根据 pnpm-workspace 里面链接的 package.json 自动安装子包的依赖
     ```
   - bug修复
     ```
     找到代码的位置，通常是在packages目录下，不同的轮子有不同的目录，举个栗子，如果你想优化或者是想修复深拷贝方法（deepCopy）。你可以根据使用文档找到它在哪个工具类下，找到对应的目录：packages => object => src => deepCopy.ts
     找到后，在你的编辑器内进行修改
     ```
   - 工具类添加
     - 有工具类
       ```
       进入到该工具类下的目录，这里还以深拷贝举例，找到对应的目录：packages => object => src =>
       在src目录下创建你的方法名称文件，然后进入文件内编辑
       ```
     - 无工具类
       ```
       如果小趴菜没有你要添加的方法或者工具的类，你可以到根目录下，执行 pnpm run create，执行后可以交互式的添加工具类或者方法。
       当然你也可以直接使用命令行
       比如：pnpm run create object deepCopy
       这就是创建了一个object工具集合的类和一个deepCopy方法
       ```
   - 方法验证：
     - 你写完了一个方法，肯定要验证这个方法是否正确的，怎么验证呢？来，跟上我的脚步。
     - 先来一波讲解：每个方法类下，都有一个**test**目录，我们验证方法的代码就在这里。
     - 每个方法类下都引入了vitest单测框架。我们要验证方法，也需要进入到该方法类的目录下。
     - 如果你不会写单测方法，可以[参考官网](https://cn.vitest.dev/)，又或者是翻看前人写的方法，不同的方法有不同的验证方式。
     - 当你完成了以上步骤之后，你就可以在方法类的目录下，执行 pnpm run test -w 命令进行来进行验证了
     ```
     比如：我要验证深拷贝的方法，将代码写到packages => object => __test__ => deepCopy.test.ts 内了。那我就在packages => object目录下，执行pnpm run test -w命令进行验证
     ```
5. 代码提交
   <br>
   经过以上的操作，相信你已经将你的bug或者是你的idea完善了，那接下来就该提交代码了，让你的头像也出现在“参与者”中
   - 第一步：提交代码
   ```
   这个如果要让我写的话就过分了啊
   ```
   - 第二步：提PR
     <br/>
     你以上的操作，有没有意义就全在这里了。打开你的浏览器，进入到你fork的项目中，上面的tab中有一个Pull request选项卡。
     - 点击New pull request
     - 你会发现有很多的下拉框，第一个是目标仓库，第二个是目标分支，第三个合并仓库（你fork的仓库），第四个是合并分支（你要合并的哪个分支）。组合起来就是，将你的合并仓库中的合并分支中的内容，合并到目标仓库的目标分支下
     - 点击 Create pull request
     - 剩下你自己摸索吧少年，再写文档，还不如回家做草鞋。
6. 当你的pr被作者通过后，那么，你就会发现，参与者的头像里，多了一个你，此时，你就能向你的面试官吹牛逼了，放肆大胆的吹牛逼

## 寄刀片地址

如果你的pr没能快速的被处理，可以给作者寄刀片

```
作者：
    Victor Bo
    hi@vtrbo.cn
管理员：
    你的晨欧巴
    lisuchen002@163.com
```
