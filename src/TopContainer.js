import './App.css';
import tw from 'twin.macro'

function TopContainer() {

  return (
    <MainContainer>

      <ProfileContainer>
        <Image src='./ppp.jpeg' />
        <Image src='./pic.jpg' />
        <InfoAboutDeveloperContainer>
          <Title>Hakkı ÜLKÜ - Mohammed Abdiaziz Hassan</Title>
          <No>172010020024</No>
          <No>182010020100</No>
          <Explanation>
            Computer Organization
          </Explanation>
          <Explanation>Midterm Project</Explanation>
        </InfoAboutDeveloperContainer>
      </ProfileContainer>



      <ApplicationExplanationContainer>
        <ApplicationTitle>MIPS SIMULATOR</ApplicationTitle>
        <AppExplanation>
          This application built to simulate MIPS 
        </AppExplanation>


        <ExplanationContainer>
          <AppExplanation>
            <Bold>Mips Architecture</Bold>
            In this simulator, there is a memory of 4096 byte which is accesible by the CPU in the case of any need. There are 32+2 registers inside 
            the CPU and also 32 floating point registers for supporting the arithmetic operations with fp instructions.
            The program support Cınditional/unconditional branching. While entering the instructions use 'space' instead of commas
            </AppExplanation>
            
            </ExplanationContainer>
            <A href="/ins.pdf" >click to see supported instructions</A>
            </ApplicationExplanationContainer>

    </MainContainer>

  );
}

export default TopContainer;


// Styled ~ Components //

const MainContainer = tw.div`flex justify-around mb-4 font-sans`

const ProfileContainer = tw.div`w-1/2 bg-blue-100 shadow-xl rounded-lg p-4
flex items-start`
const Image = tw.img`rounded-full w-32 md:w-48 ml-2 shadow-2xl`
const InfoAboutDeveloperContainer = tw.div`ml-16`
const Title = tw.h2`font-bold text-gray-900 text-3xl mt-4`
const No = tw.h3`font-bold text-xl text-gray-600 m-1`
const Explanation = tw.p`font-bold text-blue-700 text-2xl`
const ExplanationContainer = tw.div`flex items-center justify-center mb-2`

const Bold = tw.p`font-bold text-lg text-blue-900 text-center`

const ApplicationExplanationContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4`
const ApplicationTitle = tw.h2`font-bold text-gray-900 text-4xl text-center mb-1`
const AppExplanation = tw.div`font-bold text-blue-700 text-base ml-4 mb-1`

const A = tw.a`no-underline text-blue-900 font-bold bg-blue-200 p-1 rounded-lg text-center`