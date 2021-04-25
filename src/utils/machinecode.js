const {instructions} = require("./instructionDefinitions")


const machineCodeLogic = {
    add: {
        opcode: "100000"
    },
    addu: {
        op:"100001"
    },
    sub:{
       op:"100010"
    },
    addi: {
        op:"001000"
    },
    addiu: {
       op:"001001" 
    },
    and: {
       op:"100100" 
    },
    andi: {
       op:"001100" 
    },
    div: {
       op:"011010" 
    },
    divu: {
       op:"011011" 
    },
    mult: {
       op:"011000" 
    },
    multu: {
       op:"011000" 
    },
    or: {
        op:"100101" 
    },
    ori: {
       op:"001101" 
    },
    sll: {
       op:"000000" 
    },
    srl: {
        op:"000010"
    },
    slt: {
        op:"101010"
    },
    slti: {
        op:"001010"
    },
    bne:{
       op:"000101"
    },
    j:{
       op:"000010"
    },
    jal:{
       op:"000011"
    },
    jr:{
       op:"001000"
    },
    lw:{
       op:"100011"
    },
    sw:{
       op:"101011"
    },
    mfhi:{
       op:"010000"
    },
    mflo:{
      op:"010010"
   },
   mflo:{
      op:"010010"
   },
   bgt:{
      op:"000111"
   },
   ble:{
      op:"000110"
   },
   subu:{
      op:"100011"
   }
}



// instruction_machinecode_orders = dict([
//     (add_,      {opc: 0b000_000, sa: 0, fun: 0b100_000}),
//     (addu_,     {opc: 0b000_000, sa: 0, fun: 0b100_001}),
//     (and_,      {opc: 0b000_000, sa: 0, fun: 0b100_100}),
//     (break_,    {opc: 0b000_000, rd: 0, rs: 0, rt: 0, sa: 0, fun: 0b001_101}),
//     (div_,      {opc: 0b000_000, rd: 0, sa: 0, fun: 0b011_010}),
//     (divu_,     {opc: 0b000_000, rd: 0, sa: 0, fun: 0b011_011}),
//     (jalr_,     {opc: 0b000_000, rt: 0, sa: 0, fun: 0b001_001}),
//     (jr_,       {opc: 0b000_000, rd: 0, rt: 0, sa: 0, fun: 0b001_000}),
//     (mfhi_,     {opc: 0b000_000, rs: 0, rt: 0, sa: 0, fun: 0b010_000}),
//     (mflo_,     {opc: 0b000_000, rs: 0, rt: 0, sa: 0, fun: 0b010_010}),
//     (mthi_,     {opc: 0b000_000, rd: 0, rt: 0, sa: 0, fun: 0b010_001}),
//     (mtlo_,     {opc: 0b000_000, rd: 0, rt: 0, sa: 0, fun: 0b010_011}),
//     (mult_,     {opc: 0b000_000, rd: 0, sa: 0, fun: 0b011_000}),
//     (multu_,    {opc: 0b000_000, rd: 0, sa: 0, fun: 0b011_001}),
//     (nor_,      {opc: 0b000_000, sa: 0, fun: 0b100_111}),
//     (or_,       {opc: 0b000_000, sa: 0, fun: 0b100_101}),
//     (sll_,      {opc: 0b000_000, rs: 0, fun: 0b011_000}),
//     (sllv_,     {opc: 0b000_000, sa: 0, fun: 0b011_000}),
//     (slt_,      {opc: 0b000_000, sa: 0, fun: 0b101_010}),
//     (sltu_,     {opc: 0b000_000, sa: 0, fun: 0b101_011}),
//     (sra_,      {opc: 0b000_000, rs: 0, fun: 0b011_000}),
//     (srav_,     {opc: 0b000_000, sa: 0, fun: 0b011_000}),
//     (srl_,      {opc: 0b000_000, rs: 0, fun: 0b011_000}),
//     (srlv_,     {opc: 0b000_000, sa: 0, fun: 0b011_000}),
//     (sub_,      {opc: 0b000_000, sa: 0, fun: 0b100_010}),
//     (subu_,     {opc: 0b000_000, sa: 0, fun: 0b100_011}),
//     (syscall_,  {opc: 0b000_000, rd: 0, rs: 0, rt: 0, sa: 0, fun: 0b001_100}),
//     (xor_,      {opc: 0b000_000, sa: 0, fun: 0b10_0110}),

//     (addi_,     {opc: 0b001_000}),
//     (addiu_,    {opc: 0b001_001}),
//     (andi_,     {opc: 0b001_100}),
//     (beq_,      {opc: 0b000_100}),
//     (bgez_,     {opc: 0b000_001, rt: 0}),
//     (bgtz_,     {opc: 0b000_111, rt: 0}),
//     (blez_,     {opc: 0b000_110, rt: 0}),
//     (bltz_,     {opc: 0b000_001, rt: 0}),
//     (bne_,      {opc: 0b000_101}),
//     (lb_,       {opc: 0b100_000}),
//     (lbu_,      {opc: 0b100_100}),
//     (lh_,       {opc: 0b100_001}),
//     (lhu_,      {opc: 0b100_101}),
//     (lui_,      {opc: 0b001_111}),
//     (lw_,       {opc: 0b100_011}),
//     (lwc1_,     {opc: 0b110_001}),
//     (ori_,      {opc: 0b001_101}),
//     (sb_,       {opc: 0b101_000, rs: 0}),
//     (slti_,     {opc: 0b001_010}),
//     (sltiu_,    {opc: 0b001_011}),
//     (sh_,       {opc: 0b101_001, rs: 0}),
//     (sw_,       {opc: 0b101_011, rs: 0}),
//     (swc1_,     {opc: 0b111_001, rs: 0}),
//     (xori_,     {opc: 0b001_110}),

//     (j_,        {opc: 0b000_010}),
//     (jal_,      {opc: 0b000_011})
// ])