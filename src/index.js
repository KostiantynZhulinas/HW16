// function randomDelayPrint(message) {
//     if (message.length === 0) {
//       return;
//     }
  
//     const letter = message[0];
//     const restOfMessage = message.slice(1);
  
//     const randomDelay = Math.random() * 1000;
  
//     setTimeout(() => {
//       console.log(letter);
//       randomDelayPrint(restOfMessage);
//     }, randomDelay);
//   }
  
//   randomDelayPrint("Hello");
  

// function debounce(func, delay) {
//     let timeoutId;
  
//     return function () {
//       const context = this;
//       const args = arguments;
  
//       clearTimeout(timeoutId);
  
//       timeoutId = setTimeout(function () {
//         func.apply(context, args);
//       }, delay);
//     };
//   }
  
//   const expensiveOperation = () => console.log("Виконую складну операцію...");
//   const debouncedExpensiveOperation = debounce(expensiveOperation, 1000);
  
//   debouncedExpensiveOperation();
//   debouncedExpensiveOperation();
//   debouncedExpensiveOperation();



function intervalRace(functions, interval) {
    const results = [];
    let currentIndex = 0;
  
    function executeNextFunction() {
      if (currentIndex < functions.length) {
        const currentFunction = functions[currentIndex];
        const result = currentFunction();
        results.push(result);
        currentIndex++;
  
        setTimeout(executeNextFunction, interval);
      }
    }
  
    executeNextFunction();
  
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (currentIndex === functions.length) {
          clearInterval(checkInterval);
          resolve(results);
        }
      }, interval);
    });
  }
  
  function task1() {
    return "Результат 1";
  }
  
  function task2() {
    return "Результат 2";
  }
  
  function task3() {
    return "Результат 3";
  }
  
  const functions = [task1, task2, task3];
  const interval = 1000;
  
  intervalRace(functions, interval).then((results) => {
    console.log(results);
  });
    