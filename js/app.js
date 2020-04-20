var calculator = {

  number: '0',
  firstNumber: '',
  secondNumber: '',
  operation: '',
  resultNumber: '',
  rootResult: false,
  display: document.getElementById('display'),

  //Get ID of keys and call up functions to do the calculation and change style
  startCalculation: function() {
    document.getElementById('0').addEventListener('click', function(){calculator.numberKey('0'); calculator.styleKeys('0');});
    document.getElementById('1').addEventListener('click', function(){calculator.numberKey('1'); calculator.styleKeys('1');});
    document.getElementById('2').addEventListener('click', function(){calculator.numberKey('2'); calculator.styleKeys('2');});
    document.getElementById('3').addEventListener('click', function(){calculator.numberKey('3'); calculator.styleKeys('3');});
    document.getElementById('4').addEventListener('click', function(){calculator.numberKey('4'); calculator.styleKeys('4');});
    document.getElementById('5').addEventListener('click', function(){calculator.numberKey('5'); calculator.styleKeys('5');});
    document.getElementById('6').addEventListener('click', function(){calculator.numberKey('6'); calculator.styleKeys('6');});
    document.getElementById('7').addEventListener('click', function(){calculator.numberKey('7'); calculator.styleKeys('7');});
    document.getElementById('8').addEventListener('click', function(){calculator.numberKey('8'); calculator.styleKeys('8');});
    document.getElementById('9').addEventListener('click', function(){calculator.numberKey('9'); calculator.styleKeys('9');});
    document.getElementById('mas').addEventListener('click', function(){calculator.operationKey('+'); calculator.styleKeys('mas');});
    document.getElementById('menos').addEventListener('click', function(){calculator.operationKey('-'); calculator.styleKeys('menos');});
    document.getElementById('por').addEventListener('click', function(){calculator.operationKey('*'); calculator.styleKeys('por');});
    document.getElementById('dividido').addEventListener('click', function(){calculator.operationKey('/'); calculator.styleKeys('dividido');});
    document.getElementById('raiz').addEventListener('click', function(){calculator.root(); calculator.styleKeys('raiz');});
    document.getElementById('sign').addEventListener('click', function(){calculator.negative(); calculator.styleKeys('sign');});
    document.getElementById('punto').addEventListener('click', function(){calculator.decimal(); calculator.styleKeys('punto');});
    document.getElementById('igual').addEventListener('click', function(){calculator.result(); calculator.styleKeys('igual');});
    document.getElementById('on').addEventListener('click', function(){calculator.restart(); calculator.styleKeys('on');});
  },

  //Change style of keys when are cliked
  styleKeys: function(id) {
    var key = document.getElementById(id);
    if (id == '0' || id == '1' || id == '2' || id == '3' || id == 'punto' || id == 'igual') {
      key.style.width = '28.7%';
      key.style.height = '62.5px';
      key.onmouseleave = function(){
        key.style.width = '29%';
        key.style.height = '63px';
      }
    } else if (id == 'mas') {
      key.style.width = '88.5%';
      key.style.height = '99.5%';
      key.onmouseleave = function(){
        key.style.width = '90%';
        key.style.height = '100%';
      }
    } else {
      key.style.width = '21.7%';
      key.style.height = '62.5px';
      key.onmouseleave = function(){
        key.style.width = '22%';
        key.style.height = '63px';
      }
    }
  },

  //Update 'number'
  numberKey: function(key) {
    if (this.number.length < 9) {
      if (this.number == '0') {
        this.number = '';
        this.number += key;
      } else {
        this.number += key;
      }
      this.displayNumber();
    }
  },

  //Converts positive number to negative number and vice versa
  negative: function() {
    if (this.number != '0') {
      if (this.number[0] != '-') {
        this.number = '-' + this.number;
      } else {
        this.number = this.number.slice(1);
      }
      this.displayNumber();
    }
  },

  //Converts an integer into a decimal
  decimal: function() {
    if (this.number.indexOf('.') == -1) {
      this.number += '.';
      this.displayNumber();
    }
  },

  //Set up the arithmetic operation
  operationKey: function(key) {
    if (this.resultNumber === '') {
      this.firstNumber = parseFloat(this.number);
      this.resultNumber = 0;
    } else {
      this.result();
      if (this.number != '0' && this.resultNumber) {
        this.firstNumber = parseFloat(this.number);
      } else {
        this.firstNumber = parseFloat(this.resultNumber);
      }
    }
    this.number = '0';
    this.operation = key;
  },

  //Execute operation
  result: function() {
    if (this.operation != '' || this.rootResult) {
      this.secondNumber = parseFloat(this.number);

      switch (this.operation) {
        case '+':
          this.resultNumber = this.firstNumber + this.secondNumber;
          break;
        case '-':
          this.resultNumber = this.firstNumber - this.secondNumber;
          break;
        case '*':
          this.resultNumber = this.firstNumber * this.secondNumber;
          break;
        case '/':
          this.resultNumber = this.firstNumber / this.secondNumber;
          break;
      }
      this.number = this.resultNumber.toString().slice(0,9);
      this.displayNumber();
      this.number = '0';
      this.operation = '';
      this.rootResult = false;
    }
  },

  //Calculate square root
  root: function() {
    var sign = false;
    if (this.number[0] == '-') {
      this.number = this.number.slice(1);
      sign = true;
    }
    if (this.resultNumber != '') {
      this.number = this.resultNumber;
    }
    this.resultNumber = Math.sqrt(this.number);
    if (sign) {
      this.resultNumber = '-' + this.resultNumber;
    }
    this.rootResult = true;
  },

  //Restart all
  restart: function() {
    this.number = '0';
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = '';
    this.resultNumber = '';
    this.displayNumber();
  },

  //Display 'number'
   displayNumber: function() {
     this.display.innerHTML = this.number;
   }
};
calculator.startCalculation();
