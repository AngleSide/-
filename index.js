let randomNumber = Math.floor(Math.random() * 100) + 1;
    /**
      *querySelector可以接受三种类型的参数：id（#）、class（.）和标签
      * 标签的话默认的话是html第一个标签 
      **/
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');// last 最后/上一个
    const lowOrHi = document.querySelector('.lowOrHi');
    const guessSubmit = document.querySelector('.guessSubmit');// submit 提交
    const guessField = document.querySelector('.guessField');// field 字段/田地
    let guessCount = 1;
    let resetButton;//reset 重置
    /**
     * checkGuess()函数作用：
     *      
     */
    function checkGuess() {
      //Number作用，将输入的东西转为数字
      const userGuess = Number(guessField.value);//获取guessFiela值
      if (guessCount === 1) {
        guesses.textContent = '之前的猜测：(Previous guesses:) ';//在h5上输出Previous guesses: 
      }
      //textContent作用是获取其文本内容与innertext一样
      guesses.textContent += userGuess + ' ';//然后对其文本进行修改
      //guesses.textContent += userGuess + ' ' === guesses.textContent = guesses.textContent + userGuess + ' ';
      if (userGuess === randomNumber) {
        lastResult.textContent = '恭喜你！你猜对了！(Congratulations! You got it right!)';//对其文本进行修改
        lastResult.style.backgroundColor = 'green';//背景颜色变成绿色
        lowOrHi.textContent = '';//将提示词清空
        setGameOver();
      } else if (guessCount === 10) {
        lastResult.textContent = '！！！游戏结束！！！(!!!GAME OVER!!!)';
        lowOrHi.textContent = '';
        setGameOver();
      } else {
        lastResult.textContent = '猜错了(Wrong!)';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
          lowOrHi.textContent = '猜的太低了！(Last guess was too low!)';
        } else if (userGuess > randomNumber) {
          lowOrHi.textContent = '猜的太高了！(Last guess was too high!)';
        }
      }

      guessCount++;
      guessField.value = '';
      guessField.focus();//将焦点重新回到该文本框
    }

    guessSubmit.addEventListener('click', checkGuess);//当用户点击时触发checkGuess()函数
    /**
     * setGameOver()函数作用：
     *      
     */
    function setGameOver() {
      //disabled 作用是屏蔽checkbox(勾选框),ture就是屏蔽 flase就是不屏蔽
      guessField.disabled = true;
      guessSubmit.disabled = true;
      //createElement 创建一个标签
      resetButton = document.createElement('button');//创建一个button(按钮)标签
      resetButton.textContent = '再来一次';//文本写上再来一次
      //appendChild作用是将appendChild里面的内容添加到列表的末尾
      document.body.appendChild(resetButton);//将创建的button(按钮)标签添加到<body>标签的最后
      //addEventListener是一种侦听事件并处理相应函数的方法
      resetButton.addEventListener('click', resetGame);//当用户点击时触发restGame()函数
    }
    /**
     * resetGame()函数作用：
     *      
     */
    function resetGame() {
      guessCount = 1;
      const resetParas = document.querySelectorAll('.resultParas p');
      //遍历resetPara下的所有标签并删除
      for (const resetPara of resetParas) {
        // console.log(resetPara);
        resetPara.textContent = '';//替换成空字符串，相当于删除
      }

      resetButton.parentNode.removeChild(resetButton);
      //disabled 作用是屏蔽checkbox(勾选框),ture就是屏蔽 flase就是不屏蔽
      guessField.disabled = false;
      guessSubmit.disabled = false;
      //将guessField对象的value属性设置为空字符串（''），也就是清空value值
      guessField.value = '';
      guessField.focus();//将焦点自动设置到该文本框
      lastResult.style.backgroundColor = 'white';//背景设置为白色
      randomNumber = Math.floor(Math.random() * 100) + 1;//设置一个0-100的随机数
      //如果没有加1就是0-99随机数
    }