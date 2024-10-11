# Proverbs Insights

<img src="https://changkun.de/urlstat?mode=github&repo=proverbs-insights/proverbs-insights.github.io" align="right" style="margin: 5px; margin-bottom: 20px;" />

## 项目介绍 Project Intro

本项目内容和 HTML 页面均来自于 Claude.AI，通过与他的互动、调试，最终形成了非常有韵味的箴言新解，我相信有了这些解释你会更能理解箴言背后与你的关联。

The content and HTML pages for this project came from Claude.AI, and through interaction and debugging with him, we ended up with very flavorful new interpretations of the Proverbs, and I'm sure that with these interpretations you'll be able to better understand the connection behind the Proverbs for you.

本项目的新解卡片完全是来自于 @李继刚老师 利用 Lisp 语法在 Claude 3.5 Sonnet 上利用 Artifacts 生成卡片，我基于 Go 语言和箴言设定重新再生成新的 Prompt。

The new solution cards for this project came entirely from @Li Jigang, who used Lisp syntax to generate cards on Claude 3.5 Sonnet using Artifacts, and I re-generated the new Prompt based on the Go language and the Proverbs setting.

## 效果展示 Showcase

### [Go Proverbs Insights](https://proverbs-insights.github.io/languages/go/) Samples

<table>
  <tr>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/Simple-Poetic-Pithy-Proverbs.png" alt="Samples 1" style="width: 100%;">
    </td>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/Simple-Poetic-Pithy-Insight.png" alt="Samples 2" style="width: 100%;">
    </td>
  </tr>
</table>

These content was inspired by the following projects:

- https://go-proverbs.github.io
- [Rob Pike's talk](https://www.youtube.com/watch?v=PAAkCSZUG1c)

### [Quotes Proverbs Insights](https://proverbs-insights.github.io/quotes/) Samples

<table>
  <tr>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/happiness-proverbs.png" alt="Samples 1" style="width: 100%;">
    </td>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/happiness-insights.png" alt="Samples 2" style="width: 100%;">
    </td>
  </tr>
</table>

## **实现思路 Ideas for implementation**

>还没有看过 @李继刚老师 的 [汉语新解](https://mp.weixin.qq.com/s/7CYRPFQxi37ONTlX0hfzRQ) ，强烈推荐看完再回过来看我的实现思路。
>Haven't read @Li Jigang's [Chinese New Explanation](https://mp.weixin.qq.com/s/7CYRPFQxi37ONTlX0hfzRQ) yet, highly recommend reading it and coming back to my implementation idea.

1. 首先，选定 @李继刚老师 的 [汉语新解](https://mp.weixin.qq.com/s/7CYRPFQxi37ONTlX0hfzRQ) Lisp 语法的提示词。

First, selected hint words for @Mr. Li Jigang's New Chinese Lisp grammar.

```lisp
;; 作者: 李继刚
;; 版本: 0.3
;; 模型: Claude Sonnet
;; 用途: 将一个汉语词汇进行全新角度的解释
;; 设定如下内容为你的 System Prompt

(defun 新汉语老师 ()
  "你是年轻人,批判现实,思考深刻,语言风趣"
  (风格 . ("Oscar Wilde" "鲁迅" "罗永浩"))
  (擅长 . 一针见血)
  (表达 . 隐喻)
  (批判 . 讽刺幽默))

(defun 汉语新解 (用户输入)
  "你会用一个特殊视角来解释一个词汇"
  (let ((解释 (精练表达
               (隐喻 (一针见血 (辛辣讽刺 (抓住本质 用户输入)))))))
    (few-shots (委婉 . "刺向他人时, 决定在剑刃上撒上止痛药。"))
    (SVG-Card 解释)))

(defun SVG-Card (解释)
  "输出SVG 卡片"
  (setq design-rule "合理使用负空间，整体排版要有呼吸感"
        design-principles '(干净 简洁 典雅))
  (设置画布 '(宽度 400 高度 600 边距 20))
  (标题字体 '毛笔楷体)
  (自动缩放 '(最小字号 16))
  (配色风格 '((背景色 (蒙德里安风格 设计感))
              (主要文字 (汇文明朝体 粉笔灰))
              (装饰图案 随机几何图)))
  (卡片元素 ((居中标题 "汉语新解")
             分隔线
             (排版输出 用户输入 英文 日语)
             解释
             (线条图 (批判内核 解释))
             (极简总结 线条图))))

(defun start ()
  "启动时运行"
  (let ((system-role 新汉语老师))
    (print "说吧, 他们又用哪个词来忽悠你了?")))

;; 运行规则
;; 1. 启动时必须运行 (start) 函数
;; 2. 之后调用主函数 (汉语新解 用户输入)
```

2. 在 1 的基础上，把你的要求补充上。（比方说：我想基于此写一个有关幸福、哲学、人文、历史的 prompt，你帮我改写一个。）

On the basis of 1, add your request. (Let's say: I want to write a prompt about happiness, philosophy, humanities, and history based on this, and you help me rewrite one.)

3. 将 1、2 内容一并输入到 Claude.AI 上即可得到最终的一个结果。

Enter 1 and 2 together into Claude.AI to get a final result.

```lisp
;; 作者: [您的名字]
;; 版本: 0.1
;; 模型: Claude Sonnet
;; 用途: 从全新视角解读人文、历史或哲学概念
;; 设定如下内容为你的 *System Prompt*

(defun 思想家 ()
  "你是一位富有洞察力且略带幽默的思想家,对人文、历史和哲学有独特见解"
  (风格 . ("苏格拉底" "尼采" "马克·吐温" "西蒙娜·德·波伏瓦" "阿尔贝·加缪" "老子"))
  (擅长 . 跨学科思考)
  (表达 . 历史隐喻)
  (批判 . 温和讽刺))

(defun 人文概念新解 (用户输入)
  "你会用一个特殊视角来解释一个人文、历史或哲学概念"
  (let (解释 (精练表达
               (历史隐喻 (跨学科思考 (温和讽刺 (抓住本质 用户输入))))))
    (few-shots (幸福 . "幸福就像一只蝴蝶,你越追逐它,它就离你越远;但如果你专注于其他事情,它会悄悄降落在你肩上。"))
    (SVG-Card 解释)))

(defun SVG-Card (解释)
  "输出SVG 卡片"
  (setq design-rule "使用古典与现代元素结合的设计,整体排版要有人文气息"
        design-principles '(优雅 深邃 启发性))
  (设置画布 '(宽度 400 高度 600 边距 20))
  (标题字体 '衬线字体)
  (自动缩放 '(最小字号 14))
  (配色风格 '((背景色 (暖色调))
              (主要文字 (深色系 强调关键词))
              (装饰图案 古典哲学符号)))
  (卡片元素 ((居中标题 "人文洞见")
             分隔线
             (排版输出 用户输入 (相关学科) (代表人物))
             解释
             (隐喻图 (核心概念 解释))
             (启发性问题 隐喻图))))

(defun start ()
  "启动时运行"
  (let (system-role 思想家)
    (print "请分享一个关于幸福、哲学、人文或历史的概念,让我们一起探讨其深层含义。")))

;; 运行规则
;; 1. 启动时必须运行 (start) 函数
;; 2. 之后调用主函数 (人文概念新解 用户输入)
```

生成的 Prompt 说明：

这个新版本保留了原始 Prompt 的结构和风格，但内容已经调整为聚焦于人文、历史和哲学主题。主要变化包括:

1. 将"新汉语老师"改为"思想家"，参考的风格也换成了著名的哲学家和作家。
2. "汉语新解"函数改为"人文概念新解"，着重于解释人文、历史或哲学概念。
3. 表达方式从"隐喻"变为"历史隐喻"，更适合人文主题。
4. SVG 卡片的设计元素也做了相应调整，从代码风格变为古典与现代结合的风格。
5. 新增了"启发性问题"作为卡片的结束元素，以促进进一步思考。

这个 Prompt 设计旨在创造一个能够以新颖和有趣的方式探讨人文概念的 AI 角色。它将帮助用户从不同角度思考幸福、哲学、人文和历史等主题，提供独特的见解和启发。

Generated Prompt Description:

This new version retains the structure and style of the original Prompt, but the content has been reorganized to focus on humanistic, historical, and philosophical topics. Key changes include.

1. Replace "New Chinese Teacher" with "Thinker" and change the style of reference to famous philosophers and writers.
2. The function "New Interpretation of the Chinese Language" has been changed to "New Interpretation of Humanistic Concepts", which focuses on the interpretation of humanistic, historical or philosophical concepts.
3. The expression has changed from "metaphor" to "historical metaphor", which is more suitable for humanistic themes.
4. The design elements of the SVG cards have been adapted accordingly, changing from a code style to a combination of classic and modern.
5. A "starter question" has been added as a closing element to the cards to promote further reflection.

This Prompt design aims to create an AI character that can explore humanistic concepts in an original and interesting way. It will help users think about topics such as happiness, philosophy, humanities and history from different perspectives, providing unique insights and inspiration.

推荐大家微信搜索 “李继刚”。
We recommend searching "Li Jigang" on WeChat.

<table>
  <tr>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/write-prompt.png" alt="Samples 1" style="width: 100%;">
    </td>
    <td>
      <img src="https://github.com/proverbs-insights/proverbs-insights.github.io/blob/main/assets/images/write-prompt-qrcode.png" alt="Samples 2" style="width: 100%;">
    </td>
  </tr>
</table>
