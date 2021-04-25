import './App.css';
import tw from 'twin.macro'
import TopContainer from './TopContainer'
import { useState, useEffect } from 'react';

import { MemoryGenerator, RegisterGenerator, FloatRegisterGenerator } from './utils/memory'
import { Interpreter } from './utils/index'

function App() {

  let flag = true;

  const [textInput, setTextInput] = useState("")
  const [registers, setRegisters] = useState({})
  const [floatingRegisters, setFloatingRegisters] = useState({})

  const [memory, setMemory] = useState([])

  useEffect(() => {
    let reg = RegisterGenerator()
    let freg = FloatRegisterGenerator()
    let mem = MemoryGenerator()
    setRegisters(reg)
    setFloatingRegisters(freg)
    setMemory(mem)
  }, [])

  const handleClick = () => {
    let reg = RegisterGenerator()
    let freg = FloatRegisterGenerator()
    let memo = MemoryGenerator()

    setMemory( [...memo] )
    setRegisters( {...reg} )
    setFloatingRegisters( {...freg} )

    let textvalue=document.getElementById("textinput").value

    if (textInput.includes(",")){
      alert("please use space instead of comma ")
      return
    }
    setTextInput(textvalue)
    let instructionsArr = []
    textvalue.split("\n").forEach(e => {   // { labelname: "", instruction: "addi $s1 $s2 100" }
      if(e!==""){
        if (e.split(" ").length === 1) {
          instructionsArr.push({ labelname: e, instruction: "" })
        } else {
          instructionsArr.push({ labelname: "", instruction: e })
        }
      }
    })
    try {
      let [mem, regs, floats] = Interpreter(instructionsArr, memo, reg, freg)
      console.log(regs)
      setMemory([...mem])
      setRegisters({...regs})
      setFloatingRegisters({...floats})
    } catch (e) {
      alert(e)
      return
    }
  }

  return (
    <MainContainer>
      <Div>

        <Container>
          <Title>Code Area</Title>
          <CodeArea id="textinput" rows="10" cols="40"></CodeArea>
          <Run onClick={() => handleClick()} >Run</Run>
        </Container>


        <Container2>
          <Title>Registers</Title>
          <TableContainer2>

            <TableContainer>
              <RegisterTable>
                <RegisterTableHeader>Name</RegisterTableHeader>
                <RegisterTableHeader>Value</RegisterTableHeader>
                {Object.entries(registers).map((reg, i) => {
                  flag = flag ? false : true
                  if (i < 17) {
                    return flag ?
                      <RegisterTableRow>
                        <RegisterTableData> {reg[0]} : </RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow>
                      :
                      <RegisterTableRow2>
                        <RegisterTableData>{reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow2>
                  }
                })}
              </RegisterTable>
              <RegisterTable>
                <RegisterTableHeader>Name</RegisterTableHeader>
                <RegisterTableHeader>Value</RegisterTableHeader>

                {Object.entries(registers).map((reg, i) => {
                  flag = flag ? false : true
                  if (i >= 17) {
                    return flag ?
                      <RegisterTableRow>
                        <RegisterTableData> {reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow>
                      :
                      <RegisterTableRow2>
                        <RegisterTableData>{reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow2>
                  }
                })}

              </RegisterTable>
            </TableContainer>

            <TableContainer>
              <RegisterTable>
                <RegisterTableHeader>Name</RegisterTableHeader>
                <RegisterTableHeader>Value</RegisterTableHeader>

                {Object.entries(floatingRegisters).map((reg, i) => {
                  flag = flag ? false : true
                  if (i < 16) {
                    return flag ?
                      <RegisterTableRow>
                        <RegisterTableData> {reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow>
                      :
                      <RegisterTableRow2>
                        <RegisterTableData>{reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow2>
                  }
                })}

              </RegisterTable>
              <RegisterTable>
                <RegisterTableHeader>Name</RegisterTableHeader>
                <RegisterTableHeader>Value</RegisterTableHeader>

                {Object.entries(floatingRegisters).map((reg, i) => {
                  flag = flag ? false : true
                  if (i >= 16
                  ) {
                    return flag ?
                      <RegisterTableRow>
                        <RegisterTableData> {reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow>
                      :
                      <RegisterTableRow2>
                        <RegisterTableData>{reg[0]} :</RegisterTableData>
                        <RegisterTableData>{reg[1]}</RegisterTableData>
                      </RegisterTableRow2>
                  }
                })}

              </RegisterTable>
            </TableContainer>

          </TableContainer2>
        </Container2>
      </Div>

      <MemoryTableContainer>
        <Title>Memory</Title>
        <Div2>
          <MemoryUnit2>

            <MemoryBinary> Hex: </MemoryBinary>
            <MemoryDecimal> Decimal: </MemoryDecimal>
            <MemoryBinary> Binary: </MemoryBinary>

          </MemoryUnit2>
          <MemoryTable>
            {memory.map(mem => (
              <MemoryUnit>
                <MemoryAddress> {mem.address} </MemoryAddress>
                <MemoryDecimal> {mem.decimal} </MemoryDecimal>
                <MemoryBinary> {mem.binary} </MemoryBinary>
              </MemoryUnit>
            ))}
          </MemoryTable>
        </Div2>
      </MemoryTableContainer>


      <hr></hr>


      <TopContainer />
    </MainContainer>
  );
}



const MainContainer = tw.div`font-sans`

const Div = tw.div`flex w-screen justify-around mt-2 mb-8`
const Div2 = tw.div`flex items-start w-screen justify-around mt-2 mb-8`
const Container = tw.div`w-1/3 flex flex-col items-center`
const Container2 = tw.div`w-1/2`

const Title = tw.h2`font-bold text-center text-2xl text-gray-900 mb-3`


const TableContainer = tw.div`flex justify-center`
const TableContainer2 = tw.div`flex justify-around`

const RegisterTable = tw.table`text-center bg-gray-700 rounded-lg shadow-xl border-b-2 mx-2`
const RegisterTableHeader = tw.th`p-2 font-bold text-white text-xl`
const RegisterTableRow = tw.tr`text-gray-100 font-mono font-bold bg-gray-400`
const RegisterTableRow2 = tw.tr`text-gray-100 font-mono font-bold bg-gray-500`
const RegisterTableData = tw.td`p-1 text-lg`

const MemoryTableContainer = tw.div`mt-2`
const MemoryTable = tw.div`flex overflow-x-auto bg-blue-200`
const MemoryUnit = tw.div`bg-gray-400 flex flex-col text-center m-1 p-2 shadow-xl rounded-xl`
const MemoryUnit2 = tw.div`bg-gray-400 flex flex-col font-bold m-1 p-2 shadow-xl`
const MemoryAddress = tw.h3`font-bold text-white p-1 bg-gray-600`
const MemoryDecimal = tw.h3`p-1`
const MemoryBinary = tw.h3`p-1 text-white bg-gray-600`

const CodeArea = tw.textarea`w-64 h-5/6 min-w-full max-w-full bg-gray-700 text-white rounded-lg`
const Run = tw.button`text-3xl py-2 px-4 font-bold bg-green-600 border-none rounded-xl text-white
hover:bg-green-700 hover:cursor-pointer mt-2 w-2/3 focus:outline-none hover:shadow-xl`



export default App;
