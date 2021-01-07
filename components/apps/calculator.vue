<template>
  <div class="calculator" v-show="!!calculator">
    <div class="close" @click="calculator = false">X</div>
    <!-- resultado -->
    <div class="result">
      <div class="history">
        <p class="history-value"></p>
      </div>
      <div class="output">
        <p class="output-value"></p>
      </div>
    </div>

    <!-- BOTONES -->
    <div class="keyboard">
      <button class="operator clear" @click="clear">C</button>
      <button class="operator backspace" @click="backspace">CE</button>
      <button class="operator" @click="setOperator('%')">%</button>
      <button class="operator" @click="setOperator('/')">/</button>
      <button class="number" @click="setBtn('7')">7</button>
      <button class="number" @click="setBtn('8')">8</button>
      <button class="number" @click="setBtn('9')">9</button>
      <button class="operator" @click="setOperator('*')">*</button>
      <button class="number" @click="setBtn('4')">4</button>
      <button class="number" @click="setBtn('5')">5</button>
      <button class="number" @click="setBtn('6')">6</button>
      <button class="operator" @click="setOperator('-')">-</button>
      <button class="number" @click="setBtn('1')">1</button>
      <button class="number" @click="setBtn('2')">2</button>
      <button class="number" @click="setBtn('3')">3</button>
      <button class="operator" @click="setOperator('+')">+</button>
      <button class="empty"></button>
      <button class="number" @click="setBtn('0')">0</button>
      <button class="empty"></button>
      <button class="operator" @click="setOperator('=')">=</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    calculator: {
      get() {
        return this.$store.state.apps.calculator;
      },
      set(val) {
        this.$store.commit("apps/SET_CALCULATOR", val);
      }
    }
  },
  methods: {
    getHistory() {
      return document.querySelector(".history-value").innerText;
    },
    printHistory(num) {
      document.querySelector(".history-value").innerText = num;
    },
    getOutput() {
      return document.querySelector(".output-value").innerText;
    },
    printOutput(num) {
      if (num == "") {
        document.querySelector(".output-value").innerText = num;
      } else {
        document.querySelector(
          ".output-value"
        ).innerText = this.getFormattedNumber(num);
      }
    },
    getFormattedNumber(num) {
      if (num == "-") {
        return "";
      }
      var n = Number(num);
      var value = n.toLocaleString("en");
      return value;
    },
    reverseNumberFormat(num) {
      return Number(num.replace(/,/g, ""));
    },
    setBtn(number) {
      let output = this.reverseNumberFormat(this.getOutput());
      if (output != NaN) {
        //if output is a number
        output = output + number;
        this.printOutput(output);
      }
    },
    setOperator(operator) {
      var output = this.getOutput();
      var history = this.getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : this.reverseNumberFormat(output);
        history = history + output;

        if (operator == "=") {
          let result = eval(history);
          this.printOutput(result);
          this.printHistory("");
        } else {
          history = history + operator;
          this.printHistory(history);
          this.printOutput("");
        }
      }
    },
    clear() {
      this.printHistory("");
      this.printOutput("");
    },
    backspace() {
      var output = this.reverseNumberFormat(this.getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        this.printOutput(output);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.calculator {
  position: absolute;
  z-index: 9;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  width: 320px;
  height: 550px;
  background-color: #eaedef;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.close {
  width: 30px;
  height: 30px;
  float: right;
  background: rgb(206, 115, 115);
  border-radius: 50%;
  border-width: 0;
  margin: 10px;
  font-size: 15px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins";
  cursor: pointer;
}

.result {
  height: 120px;
}

.history {
  text-align: right;
  height: 20px;
  margin: 0 20px;
  padding-top: 20px;
  font-size: 15px;
  color: #919191;
}

.output {
  text-align: right;
  height: 60px;
  margin: 10px 20px;
  font-size: 30px;
}
.keyboard {
  height: 400px;
}
.operator,
.number,
.empty {
  width: 50px;
  height: 50px;
  margin: 15px;
  float: left;
  border-radius: 50%;
  border-width: 0;
  font-weight: bold;
  font-size: 15px;
}
.number,
.empty {
  background-color: #eaedef;
}

.operator {
  transition: 0.3s ease-in;

  &:hover {
    background-color: #cdcfcf;
  }
}

.number,
.operator {
  cursor: pointer;
}
.operator:active,
.number:active {
  font-size: 13px;
}
.operator:focus,
.number:focus,
.empty:focus {
  outline: 0;
}
button:nth-child(4) {
  font-size: 20px;
  background-color: #20b2aa;
}
button:nth-child(8) {
  font-size: 20px;
  background-color: #ffa500;
}
button:nth-child(12) {
  font-size: 20px;
  background-color: #f08080;
}
button:nth-child(16) {
  font-size: 20px;
  background-color: #7d93e0;
}
button:nth-child(20) {
  font-size: 20px;
  background-color: #9477af;
}
</style>
