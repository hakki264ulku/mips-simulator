// Memory function returns an array of  4096 memory units 
function MemoryGenerator() {
    const memory = []

    for (let i = 0; i < 4096; i++) {
        memory.push({
            address:`0x${Number(i).toString(16)}`,
            decimal:0,
            binary:"00000000"
        })        
    }
    return memory
}

function RegisterGenerator() {
    const registers = {
        s0: 0,
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
        s5: 0,
        s6: 0,
        s7: 0,
        a0: 0,
        a1: 0,
        a2: 0,
        a3: 0,
        v0: 0,
        v1: 0,
        at: 0,
        ra: 0,
        fp: 0,
        t0: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        t5: 0,
        t6: 0,
        t7: 0,
        t8: 0,
        t9: 0,
        sp: 0,
        gp: 0,
        k0: 0,
        k1: 0,
        hi: 0,
        lo: 0,
        zero: 0
      }
    return registers
}

function FloatRegisterGenerator() {
    const registers = {
        f0: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
        f7: 0,
        f8: 0,
        f9: 0,
        f10: 0,
        f11: 0,
        f12: 0,
        f13: 0,
        f14: 0,
        f15: 0,
        f16: 0,
        f17: 0,
        f18: 0,
        f19: 0,
        f20: 0,
        f21: 0,
        f22: 0,
        f23: 0,
        f24: 0,
        f25: 0,
        f26: 0,
        f27: 0,
        f28: 0,
        f29: 0,
        f30: 0,
        f31: 0,
      }
    return registers
}

module.exports = {MemoryGenerator, RegisterGenerator, FloatRegisterGenerator}
