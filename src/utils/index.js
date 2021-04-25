// the code will be here and we'll run it with node
const { instructions } = require('./instructionDefinitions')



// array of instructions

// Interpreter instruction will be in the format of "add $s1 $s2 $s3"
function Interpreter(instructionArr = [], memory, r, floatingRegisters) { // instructionArray, memory, registers

    // loop over instructionArr, we will produce machine code array


    const interpreterConfig = { index: 0 } // TODO DON'T FORGET TO INCREMENT jal 10 => go and read 10th line but it also saves $ra the last index it's good for procedure calls
    //const memory = MemoryGenerator()

    while (interpreterConfig.index < instructionArr.length) {

        let instructionString = instructionArr[interpreterConfig.index]

        // if it's a label continue with the other line
        if (instructionString.labelname !== "") {
            interpreterConfig.index = interpreterConfig.index + 1 // INCREMENT
            continue
        }

        instructionString = instructionArr[interpreterConfig.index].instruction

        // clear the dolor signs
        while (instructionString.indexOf("$") !== -1) instructionString = instructionString.replace("$", "")

        let splittedText = instructionString.split(" ")
        let operand = splittedText[0]
        let params = splittedText.slice(1) // addi -> s1, s2, xconstant


        if (!instructions[operand]) {
            console.log(operand)
            throw new Error("The instruction operation you provide is not valid!")
        }
        // the operation is valid. after this check: 

        if (instructions[operand].requiredNumberOfRegisters + instructions[operand].requiredNumberOfConstants !== splittedText.length - 1) {
            throw new Error("You have entered missing registers or immediate value! or you added more than needed")
        }

        // we will warn user for adding the constant/s at the end of the instruction !!!

        for (let i = 1; i <= instructions[operand].requiredNumberOfRegisters; i++) {
            if (splittedText[i] in r || splittedText[i] in floatingRegisters) { //check if it exists in register object
            } else {
                throw new Error(`The value '${splittedText[i]}' is not a valid register`)
            }
        }

        if (operand === "beq" || operand === "bne" || operand === "bgt" || operand === "bge" || operand === "blt" || operand === "ble") {
            let flag = instructions[operand].operation(params, r, interpreterConfig, instructionArr)
            if (flag) continue
        }
        else if (operand === "lw" || operand === "sw") { // lw s1 100(s2)
            let splitted = splittedText[2].split("(")
            params = [splittedText[1], splitted[1].replace(")", ""), splitted[0]]
            instructions[operand].operation(params, r, memory, interpreterConfig)
        }
        else if (operand === "j") {
            instructions[operand].operation(params, interpreterConfig, instructionArr)
            continue
        }
        else if (operand === "jr") {
            instructions[operand].operation(params, r, interpreterConfig)
            continue
        }
        else if (operand === "jal") {
            instructions[operand].operation(params, r, interpreterConfig, instructionArr)
            continue
        }
        else if (operand === "add.s" || operand === "addi.s"|| operand === "sub.s" || operand === "mul.s" || operand === "div.s") {
            instructions[operand].operation(params, floatingRegisters)

        }
        else {
            instructions[operand].operation(params, r)
        }
        interpreterConfig.index = interpreterConfig.index + 1 // INCREMENT

    }
    return [memory, r, floatingRegisters] // return r and memory
}

// Main:
// 1)addi $1,$2,100
// 2)addi $s1 $s2 100
// 3)addiu $1,$2,55
// 4)beq $1,$2, Func1
// 5) $1,$2,100
// Func1:
// 6)addi $s1 $s2 100
// 7)addiu $1,$2,55

// machine code ???


module.exports = { Interpreter }