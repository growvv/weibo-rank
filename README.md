# weibo-rank
实时爬取微博热搜榜并在Gist上展示

为了方便，你可以将它Pin到个人主页。

[查看效果](https://gist.github.com/growvv/05525c47a9ff4dff63bdab20b3e98d17)

## 一、获取数据
使用cheerio，只需要会简单的元素定位，参见[cheerio API](https://cnodejs.org/topic/5203a71844e76d216a727d2e)。

注意的是置顶项有text和url，但是没有num和degree，需要处理一下。

## 二、部署到Gist
先去生成一个Gist和token，使用gist-box可以很容易完成。

## 三、有待改进
发现Gist能展示md格式，这样的话界面可以进一步美化。

## 参考链接
1. [growvv-zhihu-is-ok](https://github.com/growvv/zhihu-is-ok)
2. [Himself65-weibo_box](https://github.com/Himself65/weibo-box)
