import React,{useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {TextArea} = Input;

const Shapes = [
    {key:1, value : "원형"},
    {key:2, value : "타원형"},
    {key:3, value : "장방형"},
    {key:4, value : "반원형"},
    {key:5, value : "마름모"},
    {key:6, value : "삼각형"},
    {key:7, value : "사각형"},
    {key:8, value : "오각형"},
    {key:9, value : "육각형"},
    {key:10, value : "팔각형"},
    {key:11, value : "기타"}
]

const Colors = [
    {key:1, value : "하양"},
    {key:2, value : "노랑"},
    {key:3, value : "주황"},
    {key:4, value : "분홍"},
    {key:5, value : "빨강"},
    {key:6, value : "갈색"},
    {key:7, value : "연두"},
    {key:8, value : "초록"},
    {key:9, value : "청록"},
    {key:10, value : "파랑"},
    {key:11, value : "남색"},
    {key:7, value : "자주"},
    {key:8, value : "보라"},
    {key:9, value : "회색"},
    {key:10, value : "검정"},
    {key:11, value : "투명"}
]

function UploadProductPage(props) {
    const [Title,setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [PTypes,setPTypes] = useState("")
    const [Shape,setShape] = useState(1)
    const [Color,setColor] = useState(1)
    const [Images,setImages] = useState([])

    const titleChangeHandler = (event) => {setTitle(event.currentTarget.value)}
    const descriptionChangeHandler=(event) => {setDescription(event.currentTarget.value)}
    const ptypesChangeHandler=(event) => {setPTypes(event.currentTarget.value)}
    const shapeChangeHandler = (event) => {setShape(event.currentTarget.value)}
    const colorChangeHandler = (event) => {setColor(event.currentTarget.value)}
    const updateImages = (newImages) => { setImages(newImages)}


    const submitHandler = (event) => {
        event.preventDefault();
        if(!Title || !Description || !PTypes || !Shape || !Color || !Images){
            return alert("모든 값을 넣어주셔야 합니다.")
        }    

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            ptypes: PTypes,
            shape: Shape,
            color: Color,
            images: Images
        }


        Axios.post("/api/product", body)
        .then(response =>{
            if (response.data.success){
                alert('알약 업로드에 성공 했습니다.')
                props.history.push('/')
            }else{
                alert('알약 업로드에 실패 했습니다.')
            }
        })
    }


  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h2>알약 업로드</h2> 
        </div>

        <Form onSubmit={submitHandler}>

            <FileUpload refreshFunction={updateImages}/>

            <br />
            <br />
            <label>이름</label>
            <Input onChange={titleChangeHandler} value={Title}/>
            <br />
            <br />
            <label>설명</label>
            <TextArea onChange={descriptionChangeHandler} value={Description}/>
            <br />
            <br />
            <label>효능</label>
            <TextArea onChange={ptypesChangeHandler} value={PTypes}/>
            <br />
            <br />
            <select onChange={shapeChangeHandler} value={Shape}>

                {Shapes.map(item => (
                    <option key={item.key} value={item.key}> {item.value} </option>
                ))}
                
            </select>
            
            &nbsp;&nbsp; &nbsp;&nbsp;  

            <select onChange={colorChangeHandler} value={Color}>

                {Colors.map(item => (
                    <option key={item.key} value={item.key}> {item.value} </option>
                ))}
                
            </select>
            <br />
            <br />
            <Button htmlType="submit">
                확인
            </Button>
        </Form>
    </div>
  )
}

export default UploadProductPage