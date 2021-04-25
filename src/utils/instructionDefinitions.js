// INSTRUCTIONS WILL BE DEFINED HERE
function findTheIndexOfLabel(instructionArr, labelName) {
    let retVal = -1
    instructionArr.forEach((element, index) => {
        if (element.labelname.trim() === labelName.trim()) retVal = index
    });
    return retVal // means the label doesn't exist
}

const instructions = {
    //Arithmetic Operations
    add: {
        name: "add",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode: "100000",
        operation: function (params, reg) {
            let [dest, s1, s2] = params
            reg[dest] = reg[s1] + reg[s2]
        }
        
    },
    sub: {
        name: "sub",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // // opcode:"100010",
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] - registers[s2]
        }
    },
    addi: {
        name: "addi",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // // opcode:"001000",
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] + parseInt(constant)
        }
    },
    addu: {
        name: "addu",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode:"001001",
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] + registers[s2] >= 0 ? registers[s1] + registers[s2] : (registers[s1] + registers[s2]) * -1
        }
    },
    subu: {
        name: "subu",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode:"100011",
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] - registers[s2] >= 0 ? registers[s1] - registers[s2] : (registers[s1] - registers[s2]) * -1
        }
    },
    addiu: {
        name: "addiu",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"001001" ,
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] + parseInt(constant) >= 0 ? registers[s1] + parseInt(constant) : (registers[s1] + parseInt(constant)) * -1

        }
    },
    mul: {
        name: "mul",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode:"011000" ,
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] * registers[s2]
        }

    },
    mult: {//mult $2,$3 $hi,$l0=$2*$3
        name: "mult",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 0,
        // opcode:"011000" ,
        operation: function (params, registers) { // TODO Later check {HI, LO} ← R[$rs] * R[$rt]
            let [s1, s2] = params
            registers["hi"] = registers[s1] * registers[s2]
            registers["lo"] = registers[s1] * registers[s2] // return one value
        }
    },
    div: {
        name: "div",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 0,
        // opcode:"011010" ,
        operation: function (params, registers) {
            let [s1, s2] = params
            registers["hi"] = registers[s1] % registers[s2]
            registers["lo"] = registers[s1] / registers[s2]
        }
    },

    //Logical part
    and: { //and $s1,$s2,$s3 $s1=$s2 & $s3 
        name: "and",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode:"100100" ,
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] & registers[s2]
        }

    },
    or: { // or $s1,$s2,$s3 $s1=$s2|$s3

        name: "or",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        // opcode:"100101",
        operation: function (params, registers) {
            let [dest, s1, s2] = params
            registers[dest] = registers[s1] | registers[s2]
        }
    },
    andi: { //andi $s1,$s2,100 $s1=$s2&100 
        name: "andi",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"001100" ,
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] & parseInt(constant)
        }

    },
    ori: { // ori $s1,$s2,100 $s1=$s2|100
        name: "ori",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"001101" ,
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] | parseInt(constant)
        }
    },
    sll: {// sll $s1,$s2,10 $s1=$s2<<10 
        name: "sll",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000000" ,
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] << parseInt(constant)
        }
    },
    srl: {// srl $s1,$s2,10 $s1=$s2>>10
        name: "srl",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000010",
        operation: function (params, registers) {
            let [dest, s1, constant] = params
            registers[dest] = registers[s1] >> parseInt(constant)
        }
    },

    //Data transfer
    lw: {
        name: "lw",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 1,
        // opcode:"100011",
        operation: function (params, registers, memory, interpreterConfig) { // let say s1 = 10, constant = 10
            let [dest, s1, constant] = params


            const currIndex = parseInt(registers[s1] + constant)
            if (currIndex < 0 || currIndex > 4092) {
                throw new Error(`The memory capacity doesn't support the value that you entered at line: ${interpreterConfig.index + 1}`)
            }

            let binaryString = ""
            binaryString += (memory[currIndex].binary + memory[currIndex + 1].binary + memory[currIndex + 2].binary + memory[currIndex + 3].binary)

            registers[dest] = parseInt(binaryString, 2)

            //registers[dest] = memory[registers[s1] + constant] // 00000000,00000000,00000001,00000010 -> think these four as a word = 32 bits resolve this 32 bits into a decimal 2^8 + 2^1 = 256 + 2 = 258
        }
    },
    sw: {//sw $1,100($2) Memory[$2 + 100]= $1
        name: "sw",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 1,
        // opcode:"101011",
        operation: function (params, registers, memory, interpreterConfig) {
            let [dest, s1, constant] = params
            const currIndex = parseInt(registers[s1] + constant)

            if (currIndex < 0 || currIndex > 4092) {
                let temp = `The memory capacity doesn't support the value that you entered at line: ${interpreterConfig.index + 1}`
                throw new Error(temp)
            }

            let binaryString32bits = Number(registers[dest] >>> 0).toString(2) // 11000
            let dif = 32 - binaryString32bits.length
            binaryString32bits = "0".repeat(dif) + binaryString32bits

            for (let i = 0; i <= 24; i += 8) {
                let tempstring = ""
                for (let j = i; j < i + 8; j++) {
                    tempstring += binaryString32bits[j]
                }
                memory[currIndex + (i / 8)].binary = tempstring
                memory[currIndex + (i / 8)].decimal = registers[dest]
                console.log(memory)
            }
        }
    },
    li: { // li $s1,100 $s1=100 
        name: "li",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 1,
        
        operation: function (params, registers) {
            let [dest, constant] = params
            registers[dest] = parseInt(constant)
        }

    },
    lui: { // lui $a1,100 $a1=100x2^16
        name: "lui",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 1,
        operation: function (params, registers) {
            let [dest, constant] = params
            registers[dest] = parseInt(constant) * Math.pow(2, 16)

        }
    },
    mfhi: {//mfhi $s2 $s2=hi
        name: "mfhi",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 0,
        // opcode:"010000",
        operation: function (params, registers) {
            let [dest] = params
            registers[dest] = registers["hi"]
        }
    },
    mflo: {//mflo $s2 $s2=lo
        name: "mflo",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 0,
        // opcode:"010010",
        operation: function (params, registers) {
            let [dest] = params
            registers[dest] = registers["lo"]
        }
    },
    move: {//move $s1,$s2 $s1=$2
        name: "move",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 0,
        operation: function (params, registers) {
            let [dest, s1] = params
            registers[dest] = registers[s1]
        }
    },

    //Conditional Branch
    beq: {
        name: "beq",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000100",
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] === registers[s2]) {
                if (Number.isInteger(parseFloat(target))) {
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    bne: {
        name: "bne",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000101",
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] !== registers[s2]) {
                if (Number.isInteger(parseFloat(target))) {
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    bgt: {
        name: "bgt",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000111",
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] > registers[s2]) {
                if (Number.isInteger(parseFloat(target))) { //a123
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    bge: {
        name: "bge",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        // opcode:"000111",
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] >= registers[s2]) {
                if (Number.isInteger(parseFloat(target))) {
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    blt: {
        name: "blt",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] < registers[s2]) {
                if (Number.isInteger(parseFloat(target))) { //a123
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    ble: {
        name: "ble",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        operation: function (params, registers, interpreterConfig, instructionArr) {
            let [s1, s2, target] = params
            if (registers[s1] <= registers[s2]) {
                if (Number.isInteger(parseFloat(target))) { //a123
                    if (target % 4 === 0) {
                        interpreterConfig.index = (target / 4) - 1
                    }
                    return true
                }
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
                return true
            } else {
                return false // means that they're not equal
            }
        }
    },
    // Comparison
    slt: {
        name: "slt",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        operation: function (params, registers) {
            let [dest, s2, s3] = params
            registers[dest] = registers[s2] < registers[s3] ? 1 : 0
        }
    },
    slti: {
        name: "slti",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        operation: function (params, registers) {
            let [dest, s2, constant] = params
            registers[dest] = registers[s2] < constant ? 1 : 0
        }
    },

    // Unconditional Branch jal label/func
    j: {
        name: "j",
        requiredNumberOfRegisters: 0,
        requiredNumberOfConstants: 1,
        operation: function (params, interpreterConfig, instructionArr) { // line numbers should be power of 4 : 4-8-12-16-20
            let [target] = params

            if (Number.isInteger(parseFloat(target))) {
                if (target % 4 === 0) {
                    interpreterConfig.index = (target / 4) - 1
                }
            } else {
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
            }
        }
    },
    jr: {
        name: "jr",
        requiredNumberOfRegisters: 1,
        requiredNumberOfConstants: 0,
        operation: function (params, registers, interpreterConfig) {
            let [target] = params
            if (registers[target] % 4 === 0) {
                interpreterConfig.index = (registers[target] / 4) - 1
            }
        }
    },
    jal: {
        name: "jal",
        requiredNumberOfRegisters: 0,
        requiredNumberOfConstants: 1,
        operation: function (params, registers, interpreterConfig, instructionArr) { // line numbers should be power of 4 : 4-8-12-16-20
            let [target] = params
            if (Number.isInteger(parseFloat(target))) {
                if (target % 4 === 0) {
                    registers["ra"] = interpreterConfig.index
                    interpreterConfig.index = (target / 4) - 1
                }
            } else {
                registers["ra"] = interpreterConfig.index
                interpreterConfig.index = findTheIndexOfLabel(instructionArr, target + ":")
            }
        }
    },
    //floating point Arithmetic operations
    "add.s": {// add.s $f1, $f2, $f3 $f1 = $f2 + $f3
        name: "add.s",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        operation: function ([dest, s1, s2], registers) {
            registers[dest] = registers[s1] + registers[s2]
        }
    },
    "addi.s": {// add.s $f1, $f2, 100 $f1 = $f2 + 100
        name: "add.s",
        requiredNumberOfRegisters: 2,
        requiredNumberOfConstants: 1,
        operation: function ([dest, s1, constant], registers) {
            registers[dest] = registers[s1] + parseFloat(constant)
        }
    },

    "sub.s": {// $f1, $f2, $f3 $f1 = $f2 – $f3
        name: "sub.s",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        operation: function ([dest, s1, s2], registers) {
            registers[dest] = registers[s1] - registers[s2]
        }
    },
    "mul.s": {// mul.s $f1, $f2, $f3 $f1 = $f2 × $f3
        name: "mul.s ",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        operation: function ([dest, s1, s2], registers) {
            registers[dest] = registers[s1] * registers[s2]
        }
    },
    "div.s": {// div.s $f1, $f2, $f3 $f1 = $f2 ÷ $f3
        name: "div.s",
        requiredNumberOfRegisters: 3,
        requiredNumberOfConstants: 0,
        operation: function ([dest, s1, s2], registers) {
            registers[dest] = registers[s1] / registers[s2]
        }
    }
}

module.exports = {
    instructions
}