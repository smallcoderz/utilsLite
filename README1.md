# 开发新功能与修改bug步骤类似，生产分支master需要保持纯净。

## 1，开发新功能：
 - 步骤1：基于master分支创建新的feature/**分支
 - 步骤2：开发中或开发完成均合并到UAT分支然后用UAT分支代码去测试
 - 步骤3：在tapd按任务完成时转给测试工程师测试，然后feature/**分支代码就保留在那里不要再动
 - 步骤4：若测试不通过，依然在feature/**分支修改再重新合并到UAT给测试工程师测试。


## 2，修改bug：（以TAPD为项目管理平台）
 - 步骤1：基于master分支创建新的bug/**分支,bug/**中**最好为TAPD的id（比如TAPD中某个bug的ID： 10000，分支名为bug/10000），方便在TAPD查看对应的需求和查看发布计划。
 - 步骤2：开发中或开发完成均合并到UAT分支然后用UAT分支代码去测试
 - 步骤3：在tapd按任务完成时转给测试工程师测试，然后bug/**分支代码就保留在那里不要再动
 - 步骤4：若测试不通过，依然在bug/**分支修改再重新合并到UAT给测试工程师测试。

## 3，SIT测试:
 - 如果有SIT，步骤1和2中请先自测SIT，再合并到UAT测试

## 4，合并到UAT测试：
 - 步骤1：更改配置文件对应为UAT环境
 - 步骤2：上传包括对应功能分支或bug分支的UAT代码或安装包或升级包 
 - 步骤3：转给测试工程师测试
 - (注意：在TAPD上完成任务或修复bug或做好功能需求了，请打包并通知测试工程师测试)

## 5，发布VER
 - 如果有，发布生产版本之前请先合并到VER分支测试，最后通过了再合并到master分支。

## 6，发布生产版本：
 - 步骤1：将UAT和VER测试通过并要求发版的对应需求的功能分支与bug分支都合并到master分支
 - （注意：未通过UAT和VER测试的分支、不需要发版的分支都绝对不能合并到master分支）

## 7，打包UAT升级包
 - 步骤1：登录http://mtdsuat.oppein.com  组织：mtds.oppein.com 用户名：admin，密码111111
 - 步骤2：打开左边系统菜单->系统管理->字典管理->系统版本->移动端Phone版本,然后点击修改按钮：
 -       （1）小版本：在备注框中仅需修改字符串参数"Mark":"*"，*为app代码文件manifest.json的版本号，*改为+1，如1.2.34改为1.2.35
 -       （2）大版本(需重新下载全量包)：在备注框中同时修改字符串"Mark":"*"和"downloadMark":"*"
 - 步骤3：在hbuilder中打开目录UAT的代码（前提是你要测试的分支已经合并到UAT分支）,修改manifest.json的版本号为步骤2的1.2.35
 - 步骤4：选中UAT目录按鼠标右键或hbuilder找到菜单：
 -       （1）小版本：发行->制作移动App资源升级包
 -            UAT 将生成的文件重命名为 mui_template_login.wgt
 -            VER 将生成的文件重命名为 oppein-mtds-app-ver.wgt
 -            PRO 将生成的文件重命名为 mui_template_login.wgt
 -       （2）大版本(需重新下载全量包)：发行->原生APP-云打包，具体参数细节请看文中的打包注意事项
 - 步骤5：打开ossbrowser软件（下载地址：https://github.com/aliyun/oss-browser 用Id=LTAIFBiMxe7OkNEi  Key=cFcQhtxx3XHdOGGXdY4Dl4crGrkQqv 登录）
 - 步骤6：上传mui_template_login.wgt文件至目录oss://opyx-mtds-test/AppInstallVersion/WGT/Phone_SheJi，上传完毕将覆盖原文件mui_template_login.wgt
 - 步骤7：确定步骤6上传完成后，回到http://mtdsuat.oppein.com系统菜单->系统管理->刷新字典缓存，点击刷新字典缓存。
 - 步骤8：在UAT的app收到升级提示，升级后查看你的测试分支是否在app中。是的话修改TAPD任务为已解决或已完成转给测试人员，不是的话再重新合并代码后再重新步骤1。

## 8，打包VER包步骤与以上序号7是一样的
 - 登录：https://mtdsver.oppein.com  组织：mtds.oppein.com 用户名：admin，密码111111
 - 升级包上传目录：oss://opyx-mtds-pro/AppInstallVersion/WGT/Phone_SheJi_ver

## 9，打包生产包步骤与以上序号7是一样的
 - 登录：http://mtds.oppein.com  组织：mtds.oppein.com 用户名：admin，密码6QfDX@Yh2GPPYFdC7rJ& 
 - 升级包上传目录：oss://opyx-mtds-pro/AppInstallVersion/WGT/Phone_SheJi

## 10，各分支合并前请先拉取最新代码

# 开发规范
> 本开发规范针对MTDS及周边项目前端开发制定，约束TMDS项目前端架构及开发规范，代码质量等相关内容，请严格遵照本规范进行项目前端开发。

## 前端架构
> 前端架构包括前端技术栈的选型、目录结构构成、功能模块的组织等相关内容，因分析项目业务需求和团队技术储备等因素根据实际情况进行技术选型和功能架构，原则上因从以下几个方面进行评估：

### 前端框架的选择
> 作为企业级的前端框架技术选型，我们从以下几个维度进行思考。

#### 1. 法律风险
>技术选型，应该首先考虑所用的框架 License 是不是存在法律风险。相关内容请参阅开源协议规范文档。
  
#### 2. 稳定性
> 俗话说：稳定压倒一切，稳定，是社会和谐发展的前提条件，同样也是企业级软件系统的生死线，如果一个系统连基本的稳定都没有。
是不可接受的，对于开源框架的技术选型，稳定性也是至关重要的一环。
  
#### 3. 团队学习坡度及社区生态
> 轻车熟路，好上手，见效快；选型上因结合团队整体的技术水平和知识结构进行选择，同时考虑选择目标的生态圈活跃度，在圈内是否有一定的开发氛围，bug修复的速度，文档是否详细。
社区生态其实就是看一下 stackoverflow 或者 segmentfalut 上问题的 tag 数，当使用这个技术时能否通过搜索引擎快速查找到解决方案，这个是衡量这个技术是否社区活跃的重要因素，这个也有助于效率。
  
#### 4. 开发工具及流程闭环
> 选择目标是否有配套的多种工具，开发的流程能不能够基于这些工具完成一个稳定健康的闭环，即选择目标后，它附带的脚手架、构建、压缩、单测等工具能不能够覆盖项目的整个生命周期，从设计、开发、测试、发布、运维等各方面都能覆盖到。
比如 vue 和 angular 这方面就比 React 要强一些，React 主要 focus 视图层，而 vue 官方就会直接推荐一整套解决方案，从路由、脚手架等，不过 React 后来也加入了一些官方的东西，比如 create-react-app 这个脚手架的引入。
  
#### 5.可维护性及可扩展性
> 因人而异，可维护性和扩展性，在框架那一层是大多是没有问题的，关键还是写代码的人，代码的API设计、模式分层要把控好。
  
#### 6.团队并行开发效率
> 在任务不变的情况下，压缩交付周期，可通过增加资源解决。

> 说人话就是，某天，Boss的小姨子说：我们要加快产品开发进度，在11.11前发布上线。
从进公司第一天开始，就暗恋她的你，拍拍胸膛，自信满满的说：请女神放心，我们使用的框架只要给我“三千城管”，就能在保证质量的前提下更快的完成任务。
终于在11.11之前产品完美发布上线，女神芳心大悦，11.11那晚Boss和女神去神秘地方庆祝，你在公司对着“三千城管”说，来，兄弟们！干了爱情这杯可乐！
  
#### 7.与新标准的融合度
> 着眼于现在，也要面向未来，选择目标框架应是面向未来的，但是如果做不到这一点，那么该框架前途未卜，不是一个好的选择。

#### 8. 方便调优及监控
> 选择目标的时需要考虑该框架在设计时是否允许一些 hook 机制或者中间件机制，是否方便在一些关键的节点插入监控脚本来获知当前的性能数据以及达到性能优化的目的。
应该为未来优化埋下一粒种子。

### 目录结构
> 项目的目录结构是否合理清晰，关系到前端团队合作和后期维护是否高效和快捷。一般而言，目录结构因技术栈、单页或多页应用不同而不尽相同。
一个典型的单页（SPA）应用前端目录结构如下：

```
目录/文件   说明
build   这个是我们最终发布的时候会把代码发布在这里，在开发阶段，我们基本不用管。
config  配置目录，默认配置没有问题，所以我们也不用管
node_modules    这个目录是存放我们项目开发依赖的一些模块，这里面有很多很多内容，不过高兴的是，我们也不用管
src 我们的开发目录，基本上绝大多数工作都是在这里开展的
static  资源目录，我们可以把一些图片啊，字体啊，放在这里。
test    初始测试目录，没用，删除即可
.xxxx文件 这些是一些配置文件，包括语法配置，git配置等。基本不用管，放着就是了
index.html  首页入口文件，基本不用管，如果是开发移动端项目，可以在head区域加上你合适的meta头
package.json    项目配置文件。前期基本不用管，但是你可以找一下相关的资料，学习一下里面的各项配置。至少，要知道分别是干嘛的。初期就不管了。
README.md   不用管
```

## 项目约束和命名规范

### 项目约束
* 本APP使用主要使用MUI开发，以VUE辅助数据渲染。
* 因为配置麻烦，难以使用常规手法编译，所以本APP全部使用ES5语法，使用到的ES6语法需要把Polyfill添加到base.js文件结尾。
  当前已添加的语法有`Object.assign,Object.keys,Array.prototype.find,Array.prototype.forEach,NodeList.prototype.forEach`
* 关于后端的接口方面，正常的规范为在base.js中定义接口名称变量(如reportUrl:报备接口)；然后再在页面中引入调用。
* 项目主要的组件有：1.图片组的上传及预览 2.微信推送模块组件
* 在vue页面初始化以前，需要以v-cloak属性隐藏模板
* vue挂载以后再绑定事件
* 解耦页面，在跳转前将页面回调事件传入新页面，再在新页面中调用传入的回调，实现解耦
* plus读取的路径可能有存在权限问题，需要加上下横线路径：例如 `_doc/`,`_download/`等
* 连续回调页面需要在回调中继回调页面回调事件中增加延迟执行setTimeout方法，否则在回调页面后，在安卓机上会出现跳出了多级页面

### 命名规范
我们遵循以下文件命名和变量命名规范

1. 除Vue组件文件和目录外，其他文件或目录一律使用小写命名，使用短横线分隔不同单词，e.g. `/home-floor/home-floor.html`。
2. Vue组件文件
3. html 中所有标签、属性和指令使用小写，使用短横线分隔不同单词，e.g. `data-minicart-theme`。
4. css 中 id 和 class 一律使用小写命名，使用短横线分隔不同单词，e.g. `.home-floor`。
5. javascript 中局部变量使用驼峰命名法，常量使用全大写，下划线分隔单词，e.g. `PAGE_DATA`。

## 代码质量

## CSS
  新增公共样式文件
  mtds-html-app/css/global.css 
	
## VUE
### 组件

####vue组件
> 项目主要的组件有：1.图片组的上传及预览 2.微信推送模块组件

#### vue组件定义
如何定义一个vue组件；
>新建一个js文件，将要实现的组件功能添加到js中
```
Vue.component('img-upload', {
    ...
})
```
如何引入一个vue组件；
```
<!-- 需要先引入[阿里云上传组件,Vue,mui,binaryajax,exif,canvasResize,mui.previewimage, imgUpload.css,previewimage.css] -->
<link href="../../css/mui.min.css" rel="stylesheet" />
<link href="../../css/imgUpload.css" rel="stylesheet" /><!-- 上传组件 -->
<link href="../../css/previewImage.css" rel="stylesheet" /><!-- 预览图片 -->
<script src="../../js/mui.min.js"></script>
<script src="../../js/vue/vue.min.js"></script>
<script src="../../js/base.js"></script>
<script src="../../js/mui.zoom.js"></script><!-- 预览图片 -->
<script src="../../js/default.mui.previewimage.js"></script><!-- 预览图片 -->
<script src="../../js/promise-6.1.0.js"></script><!-- 阿里云上传 -->
<script src="../../js/aliyun-oss-sdk-4.4.4.min.js"></script><!-- 阿里云上传 -->
<script src="../../js/binaryajax.js"></script><!-- 图片上传处理 -->
<script src="../../js/exif.js"></script><!-- 图片上传处理 -->
<script src="../../js/canvasResize.js"></script><!-- 图片上传处理 -->
<script src="../../js/md5.js"></script><!-- 图片上传处理 -->
<script src="../../js/vue/components/imgUpload.js"></script><!-- 上传组件 -->
<script>
mui.init({
    gestureConfig: { //若果需要长按删除，需要在mui启动时初始化长按事件
        longtap: true, //默认为false
    }
});
</script>
 <!-- 组件需要在vue中使用 -->
<img-upload
    v-model="[]" <!-- 必选,传入初始数据并双向绑定 -->
    ref="componentId" <!-- 可选,组件id,默认无,vue语法用于调用组件内的变量或者方法 -->
    id="任意id" <!-- 可选,组件id,默认随机,用于区分上传id -->
    dir="testDir"  <!-- 可选,文件夹名,默认testDir，上传到阿里云哪个文件夹 -->
    :is-upload="true" <!-- 可选,是否开启上传,默认开启,不开启时可以隐藏加号 -->
    :is-deletable="false" <!-- 可选,是否开启删除,默认不开启,开启时可以长按图片删除，可以调用组件内this.$refs.componentId.getDeletedFileIds()获取删除的id数组 -->
    :multiple="true" <!-- 可选,选择图片时是否可以选择多个,默认开启,一般与最大上传图片数量一起用 -->
    :max-length="0" <!-- 可选,最大上传图片数量,默认0代表不限制 -->
    :max-size="500" <!-- 可选,最大上传图片大小,默认0代表不限制 -->
    :list-keys="{id:'id',name:'name',suffix:'suffix',size:'size',path:'path'}" <!-- 可选,显示的key值,默认如下,用于改变传入参数的对应的必须值(id不会返回) -->
    :before-upload="function(){return true}" <!-- 可选,文件开始上传前对文件的处理过滤,默认0代表不限制,传的话必须返回true不然不会继续上传 -->
    @upload-start="function(){}" <!-- 可选,上传开始时调用方法,默认空,用于提醒用户正在上传不要关闭页面之类的 -->
    @upload-end="function(){}" <!-- 可选,上传结束时无论成功失败调用方法,默认空,用于关闭提醒 -->
    @upload-success="function(fileInfo){}" <!-- 可选,上传成功时调用方法,默认空,参数为上传成功后的阿里云文件信息对象,对象值为listKeys传入的参数的对应值 -->
    @upload-error="function(errStr){}" <!-- 可选,上传文件失败时调用方法,默认空,参数为字符串异常类型 -->
    @delete-success="function(fileInfo){}" <!-- 可选,删除成功时调用方法,默认空,参数为删除成功后的删除文件对象,对象值为listKeys传入的参数的对应值 -->
></img-upload>
<!-- 常见问题：渲染后无法初始化第二次，所以无法初始化显示原有文件。解决办法：将v-model的值设置未null,再加上v-if设置未v-model的值 -->
```

## MUI

#### mui组件

如何使用mui组件
* 使用mui组件请参考[mui文档](http://dev.dcloud.net.cn/mui/ui/)
* 使用h5+组件请参考[html5plus文档](http://www.html5plus.org/doc/h5p.html)

## 服务器环境配置

## 打包注意事项
* 打包时注意修改 `manifest.json` 文件
* 发布秘钥密码 master366305
  sit appid: H520617A1
  uat appid: H52B8F4AA
  ver appid: H531954C6
  pro appid: H53EA36A0
* 各环境打包证书在unpackage/env中

## 切换环境
*  /js/base.js 文件中修改 environment 变量

## 蒲公英：
* Uat环境：
  * 账号：3368770016@qq.com
  * 密码：Oppein_hxc@2017

* Ver环境：
  * 账号：wupeng@oppein.com
  * 密码：zhangjin

* Prod环境：
  * 账号：179158282@qq.com
  * 密码：ZK823423
  
## Dcloud：
  * [Dcloud配置页面](http://dev.dcloud.net.cn)
  * 账号：3056301048@qq.com
  * 密码：WUpeng219979

## 个推
* Sit环境
  * AppID： fhALVpiE9o8GfrAab1JCG
  * AppSecret： BIopV0UKaCAZ8Xsgi8dBuA
  * AppKey： oUS5BY7Fjz8LkOz6RtTzE7
  * MasterSecret： 6gvuZUUaQD6ZdrGXbGmrr4

* Uat环境 
  * AppID： li0gQg7wNT9CCCvGKohRu8
  * AppSecret： IvaFeiUO8R6TkbhxHPKkd1
  * AppKey： o13EnziaP16XfeaLZu5oA4
  * MasterSecret： qKVgQOdBnC6URufcpxazg

* Ver环境 
  * AppID：26i0XI5jDVAnS4YDfYz1z5
  * AppSecret： nZYeFccg72AzLS7JFUwJa5
  * AppKey： VAgJU7tAZ59IiFtKj24lS9
  * MasterSecret：riUlqM7Z2f7E5r2dwD1ZE

* Prod环境 
  * AppID： KDpxTWQ6Av8Kme7V90u6o9
  * AppSecret： XUFFxRVcFk6sTRvd9U8hB8
  * AppKey： evNafAjUBQ7mXhRL5ia194
  * MasterSecret： bsPThBMq8MAl1ATWnKp7Y6

## 打升级包步骤
* 安装hbuilder并且拉取所有最新代码
* hbuilder打开代码文件夹并转换为移动项目
* hbuilder打开manifest.json文件，记录版本号（如1.1.16）
* 打开网站后台http://mtdsuat.oppein.com 登陆账号mtds.oppein.com  admin 111111  （uat）
* 左边栏菜单找到 系统管理->字典管理
* 字典中找到 系统版本->移动端Phone版本->修改->备注字段->json中的Mark字段（当前版本号）
* 修改两处版本号（不兼容大版本号-功能版本号-bug修复版本号）往上+1，保持一致，保存！
* hbuilder找到菜单：发行->制作移动App资源升级包，确定
* 将生成的文件重命名为 mui_template_login.wgt 
* 打开[oss软件](https://help.aliyun.com/document_detail/61872.html?spm=a2c4g.11186623.6.1122.kzkTCz) Id=LTAIFBiMxe7OkNEi  Key=cFcQhtxx3XHdOGGXdY4Dl4crGrkQqv
* ps:发ver和pro升级包需要找黄沿箐（运维）
* 找到opyx-mtds-test -> AppInstallVersion -> WGT -> Phone_SheJi
* 将刚刚生成的升级包 mui_template_login.wgt 上传到此文件夹
* 打开网站后台 左边菜单 -> 系统管理 -> 刷新字典缓存 -> 点击刷新按钮


## 开发者资源
* [markdown用法](http://www.appinn.com/markdown/)
* [mui文档](http://dev.dcloud.net.cn/mui/ui/)
* [h5+规范](http://www.html5plus.org/doc/h5p.html)
* [vuejs2文档](https://cn.vuejs.org/v2/guide/) mui强调页面预加载，原生渲染，原生加速，所以这里只需要了解vue中的双向绑定、过滤器、生命周期即可
* [iscroll中文文档](http://www.360doc.com/content/14/0724/11/16276861_396699901.shtml) / [iscroll新版本](http://cubiq.org/iscroll-5) mui自带的上拉下拉比较坑，这里换成了iscroll
* [mescroll](http://www.mescroll.com/) 听说很多大神都用mescroll了
* [sass安装/入门](http://www.haorooms.com/post/sass_css)

# MTDS-APP技术说明文档
mtds-app是欧派营销平台mtds的移动操作版，将部分需要移动完成的任务转移到手机端完成

## 技术选型

### MUI
性能和体验的差距，一直是mobile app开发者放弃HTML5的首要原因。 浏览器天生的切页白屏、不忍直视的转页动画、浮动元素的抖动、无法流畅下拉刷新等问题，这些都让HTML5开发者倍感挫败，尤其拿到Android低端机运行，摔手机的心都有； 另一方面，浏览器默认控件样式又少又丑，制作一个漂亮的控件非常麻烦，也有一些制作简单的ui框架但性能低下。
mui框架有效的解决了这些问题，这是一个可以方便开发出高性能App的框架，也是目前最接近原生App效果的框架。

### VUE
Vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

### 阿里ICONFONT图标库
阿里妈妈MUX倾力打造的矢量图标管理、交流平台。
设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。

### 阿里云对象存储 OSS
海量、安全、低成本、高可靠的云存储服务，提供99.99999999%的数据可靠性。使用RESTful API 可以在互联网任何位置存储和访问，容量和处理能力弹性扩展，多种存储类型供选择全面优化存储成本。

## 技术优劣势对比
* MUI：对比PhoneGap/Cordova/React-Native/WEX5/jQuery-Mobile/Angular-Ionic等技术，在同样解决多平台公用一套代码的同时， MUI有一个不可小看的优点：技术要求低，容易找到高效上手工作的开发人员。 但劣势是在不配合一些新语法新框架的时候，开发代码就像在过去5年前一样痛苦，绑定数据，渲染数据等方面比较落后
* VUE：当前最流行的前端技术之一，与MUI的那个优点相同，容易找到开发人员，同时对比angular/react等技术，vue有易于上手、容易拆分、体积小等契合移动端的优势。

## 技术作用介绍
由HTML5+提供跨平台底座，MUI提供页面预加载，页面跳转渲染，事件监听等功能，VUE负责具体页面数据渲染，逻辑处理等，共同构成了MTDS-APP。

## 项目模块介绍

### 登录页
* 登录功能
* APP热更新功能
* 监听网络变化事件
* 监听切换前后台事件

### 首页
* 底部菜单：切换到首页时重新加载首页提醒
* 首页菜单
* 消息、提醒、任务栏

### 个人中心
* 个人中心首页：退出登录APP
* 修改各种个人资料页

### 任务模块
* 任务列表
* 多任务并列详情
* 多量尺任务并列详情
* 量尺任务处理
* 合同签订任务处理
* 邀约任务处理
* 确定类任务处理
* 送货、安装、验收类任务处理：收款、遗留单申报
* 任务完成指派页面
* 任务回退页面

### 服务号服务单模块
* 建档列表：建档报备
* 添加修改建档信息
* 服务号列表
* 服务号详情：查看当前服务号下的服务单，失单，补单
* 添加服务号/编辑服务号详情：基本信息、需求信息、建档信息、手绘图等功能
* 直接分配设计师
* 带单
* 一键求助
* 跟进页面：添加跟进、跟进历史
* 服务单列表
* 服务单详情页面

### 申请及审批模块
* 我的申请列表：撤回申请、重新提交申请
* 我的待审批列表
* 我的待分配设计师列表
* 添加申请/重新提交申请页面
* 普通审核页面
* 分配设计师审核页面：微信推送分配设计师时间给客户
* 转交审核/转交分配页面

### 消息模块
* 消息列表
* 消息详情：根据类型跳转到对应处理或者查看页面（任务处理页/申请处理页/服务号详情/服务单详情/消息详情）
* 接收推送：点击消息中心时跳转到消息对应页面，在线收到消息时iOS系统弹出消息

### 个人日程管理模块
* 我的日程
* 添加安排日程：选择任务

### 方案库及知识库模块
* 方案库列表：搜索查看方案，收藏方案，点击预览方案
* 知识库列表
* 知识库内页知识详情

### 其他公用页面
* 门店选择页面
* 商场结构人员选择：字母索引

### 其他系统页面接入
* BI报表
* 设计师交流平台

### asspApp页面
* 专员个人资料修改（头像/二维码/其它相关信息）
* 活动列表（点将结算/上传源文件）
* 点将活动（满意度/下载源文件）

## 项目经历的波折和历史遗留问题
* 项目初启时，IBM的后端出身的前端使用了ejs模板渲染，并且不运用UI，不做架构，导致了项目结构不稳，难以全局升级等
* 由于需求未确定，日程模块，与下单后流程任务均未完成

## 技术规范
* 本APP使用主要使用MUI开发，以VUE辅助数据渲染。
* 因为配置麻烦，难以使用常规手法编译，所以本APP全部使用ES5语法，使用到的ES6语法需要把Polyfill添加到base.js文件结尾。
  当前已添加的语法有`Object.assign,Object.keys,Array.prototype.find,Array.prototype.forEach,NodeList.prototype.forEach`
* 关于后端的接口方面，正常的规范为在base.js中定义接口名称变量(如reportUrl:报备接口)；然后再在页面中引入调用。
* 项目主要的组件有：1.图片组的上传及预览 2.微信推送模块组件
* 在vue页面初始化以前，需要以v-cloak属性隐藏模板
* vue挂载以后再绑定事件
* 解耦页面，在跳转前将页面回调事件传入新页面，再在新页面中调用传入的回调，实现解耦
* plus读取的路径可能有存在权限问题，需要加上下横线路径：例如 `_doc/`,`_download/`等
* 连续回调页面需要在回调中继回调页面回调事件中增加延迟执行setTimeout方法，否则在回调页面后，在安卓机上会出现跳出了多级页面

## 快速构建页面
3步搭好页面主框架

### 1. 新建含mui的HTML文件
在Hbuilder中，新建HTML文件，选择”含mui的HTML“模板，可以快速生成mui页面模板，该模板默认处理了mui的js、css资源引用。

### 2.输入mheader
顶部标题栏是每个页面都必需的内容，在Hbuilder中输入mheader，可以快速生成顶部导航栏。

### 3.输入mbody
除顶部导航、底部选项卡两个控件之外，其它控件都建议放在.mui-content控件内，在Hbuilder中输入mbody，可快速生成包含.mui-content的代码块。

### 4.完整代码块请参考
[snippet](http://dev.dcloud.net.cn/mui/snippet/)
