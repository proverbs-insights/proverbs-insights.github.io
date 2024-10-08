// 读取本地 JSON 文件
fetch('/languages/go/proverbs.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // 将 JSON 数据分配给一个常量
    const quotes = data;

    // 在 JavaScript 中以常量方式使用 JSON 数据
    // console.log("JSON Data:", quotes);

    let currentIndex = 0;
    let isAnimating = false;
    let interpretationVisible = false;

    const quoteCard = document.getElementById('quoteCard');
    const interpretationContainer = document.getElementById('interpretationContainer');
    const quoteInterpretation = document.getElementById('quoteInterpretation');
    const svgContainer = document.getElementById('svgContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const backToTopButton = document.getElementById('backToTop');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

 

   function createQuoteCard(quote, direction = 'next') {
       if (isAnimating) return;
       isAnimating = true;
   
       const container = document.getElementById('quoteCardContainer');
       const oldQuoteCard = document.getElementById('quoteCard');
       const newQuoteCard = document.createElement('div');
       newQuoteCard.className = 'quote-card';
       newQuoteCard.innerHTML = `
           <div class="quote-chinese">${quote.chinese}</div>
           <div class="quote-english">${quote.english}</div>
           ${quote.author ? `<div class="quote-author">— ${quote.author}</div>` : ''}
           ${quote.source ? `<div class="quote-source">出处 / Source: ${formatSource(quote.source)}</div>` : ''}
       `;
   
       // Set initial positions
       newQuoteCard.style.position = 'absolute';
       newQuoteCard.style.top = '0';
       newQuoteCard.style.width = '100%';
       if (direction === 'next') {
        newQuoteCard.style.right = '100%';
       } else {
        newQuoteCard.style.left = '100%';
       }

       // Add the new card to the container
       container.appendChild(newQuoteCard);

   
       // Trigger reflow
       void newQuoteCard.offsetWidth;
   
   
       if (direction === 'next') {
           oldQuoteCard.classList.add('slide-right');
       } else {
           oldQuoteCard.classList.add('slide-left');
       }
   
       // After animation, clean up
       setTimeout(() => {
           container.removeChild(oldQuoteCard);
           newQuoteCard.id = 'quoteCard';
           newQuoteCard.style.position = '';
           newQuoteCard.style.top = '';
           newQuoteCard.style.left = '';
           newQuoteCard.style.width = '';
           newQuoteCard.style.transform = '';
           isAnimating = false;
            
           // Update interpretation and SVG
            quoteInterpretation.innerHTML = `
            <div class="interpretation-title">箴言新解 / Proverbs Insights:</div>
            <p class="interpretation-chinese">${quote.interpretation.zh || 'TODO'}</p>
            <p class="interpretation-english">${quote.interpretation.en || 'TODO'}</p>
            `;
            svgContainer.innerHTML = quote.svg || '';
       }, 300);
   

   }
   

    function formatSource(source) {
        // 匹配文本中括号内的URL
        const urlRegex = /(.*?)\((https?:\/\/[^\s)]+)\)/g;
        
        return source.replace(urlRegex, (match, text, url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        });
    }

    // function drawQuoteCard(quote) {
    //     // 设置背景
    //     ctx.fillStyle = '#f8f4e5';
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     // 绘制背景图案
    //     drawBackgroundPattern();

    //     // 绘制半透明白色背景
    //     ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    //     ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

    //     // 设置字体和颜色
    //     ctx.fillStyle = '#2d3748';

    //     // 绘制中文引用
    //     ctx.font = '24px "Ma Shan Zheng"';
    //     let yPos = wrapText(ctx, quote.chinese, 40, 60, canvas.width - 80, 36);

    //     // 绘制英文引用
    //     ctx.font = '18px "Noto Serif"';
    //     yPos = wrapText(ctx, quote.english, 40, yPos + 20, canvas.width - 80, 28);

    //     // 绘制作者
    //     if (quote.author) {
    //         ctx.font = 'italic 14px "Noto Serif"';
    //         ctx.textAlign = 'right';
    //         ctx.fillText(`— ${quote.author}`, canvas.width - 40, yPos + 30);
    //         yPos += 30;
    //     }

    //     // 绘制出处
    //     if (quote.source) {
    //         ctx.font = '14px "Noto Serif"';
    //         ctx.fillStyle = '#6b7280';
    //         ctx.textAlign = 'right';
    //         // 对于图片，我们总是显示完整的URL
    //         const sourceText = `出处 / Source: ${quote.source}`;
    //         ctx.fillText(sourceText, canvas.width - 40, yPos + 20);
    //     }

    //     // 绘制标题和分类
    //     ctx.font = '16px "Ma Shan Zheng"';
    //     ctx.fillStyle = '#2d3748';  // 使用与引用相同的颜色
    //     ctx.textAlign = 'left';
    //     ctx.fillText('Go 语言箴言新解', 40, canvas.height - 20);
    //     ctx.textAlign = 'right';
    //     ctx.fillText(quote.category, canvas.width - 40, canvas.height - 20);

    //     // 绘制新解
    //     yPos += 40;
    //     ctx.font = '16px "Noto Serif"';
    //     ctx.fillStyle = '#4a5568';
    //     ctx.textAlign = 'left';
    //     yPos = wrapText(ctx, '箴言新解：', 40, yPos, canvas.width - 80, 24);
    //     yPos = wrapText(ctx, quote.interpretation.zh || 'TODO', 40, yPos + 10, canvas.width - 80, 24);

    //     // 绘制SVG（如果有）
    //     if (quote.svg) {
    //         yPos += 20;
    //         drawSVG(ctx, quote.svg, 40, yPos);
    //     }
    // }

    // function drawSVG(ctx, svgString, x, y) {
    //     // 这个函数需要实现SVG到Canvas的转换
    //     // 由于复杂性，这里只是一个占位符
    //     ctx.font = '14px Arial';
    //     ctx.fillText('SVG图表位置', x, y + 50);
    // }

    // function drawBackgroundPattern() {
    //     const patternCanvas = document.createElement('canvas');
    //     const patternContext = patternCanvas.getContext('2d');
    //     patternCanvas.width = 100;
    //     patternCanvas.height = 100;
        
    //     patternContext.fillStyle = '#e6dfcc';
    //     patternContext.globalAlpha = 0.4;
        
    //     // 绘制简化版的背景图案
    //     patternContext.beginPath();
    //     patternContext.arc(11, 18, 7, 0, 2 * Math.PI);
    //     patternContext.arc(59, 43, 7, 0, 2 * Math.PI);
    //     patternContext.arc(34, 90, 3, 0, 2 * Math.PI);
    //     patternContext.fill();

    //     const pattern = ctx.createPattern(patternCanvas, 'repeat');
    //     ctx.fillStyle = pattern;
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    // }

    // function wrapText(context, text, x, y, maxWidth, lineHeight) {
    //     const words = text.split('');
    //     let line = '';
    //     let currentY = y;

    //     for (let n = 0; n < words.length; n++) {
    //         const testLine = line + words[n];
    //         const metrics = context.measureText(testLine);
    //         const testWidth = metrics.width;
    //         if (testWidth > maxWidth && n > 0) {
    //             context.fillText(line, x, currentY);
    //             line = words[n];
    //             currentY += lineHeight;
    //         } else {
    //             line = testLine;
    //         }
    //     }
    //     context.fillText(line, x, currentY);
    //     return currentY;  // 返回最后一行的 Y 坐标
    // }

    function prevQuote() {
        if (!isAnimating) {
            currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
            createQuoteCard(quotes[currentIndex], 'prev');
        }
    }
    
    function nextQuote() {
        if (!isAnimating) {
            currentIndex = (currentIndex + 1) % quotes.length;
            createQuoteCard(quotes[currentIndex], 'next');
        }
    }

    let touchStartX = 0;
    let touchEndX = 0;

    // 触摸事件
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    // 添加按钮点击事件
    prevButton.addEventListener('click', prevQuote);
    nextButton.addEventListener('click', nextQuote);

    // 处理手势滑动
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (isAnimating) return;
        const swipeThreshold = 50; // 最小滑动距离
        if (touchEndX < touchStartX - swipeThreshold) {
            nextQuote(); // 左滑，下一个引用
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevQuote(); // 右滑，上一个引用
        }
    }

    // 处理回到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 初始化第一个引用
    createQuoteCard(quotes[0]);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
