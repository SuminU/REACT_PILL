import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Icon, Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import CheckBox from './Sections/CheckBox';
import ColorBox from './Sections/ColorBox';
import {shape, color} from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)   //8개씩 표시
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        shape: [],
        color: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
      
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success){
                if(body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
                
            }else{
            alert(" 알약을 가져오는데 실패 했습니다.")
            }
        })
    }

    const loadMorhander = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore : true
        }

        getProducts(body)
        setSkip(skip)
    }
    

    const renderCards = Products.map((product, index) => {

        return<Col lg={6} md={8} xs={24}  key={index}><Card
       
        cover={<a href={`/product/${product._id}`}><img style={{width: '100%', maxHeight: '150px' }} src={`http://localhost:5000/${product.images[0]}`} /></a>}

            >
            <Meta
                title={product.title}
                description={product.ptypes}
            />
        </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        
        getProducts(body)
        setSkip(0)

    }


    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}

        newFilters[category] = filters

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }


    const updateSearchTerm = (newSearchTerm) => {
        

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        
        setSearchTerm(newSearchTerm)
        getProducts(body)
        setSkip(0)
    }


    return (
        <div style={{width: '75%', margin: '3rem auto'}}>

            <div style={{textAlign: 'center'}}>
                    <h2>PILL SEARCH <Icon type="search" /></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>

            {/* shape checkBox */}
            <Col lg={12} xs={24}>       
            <CheckBox list={shape} handleFilters={filters => handleFilters(filters, "shape")} /> 
            </Col>

            {/* color checkBox */}
            <Col lg={12} xs={24}>
            <ColorBox list={color} handleFilters={filters => handleFilters(filters, "color")} />
            </Col>

            </Row>


            {/* search */}
        <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
            <SearchFeature
                refreshFunction={updateSearchTerm}/>
            </div>    
        

        <br/>

            {/* Cards */}
        <Row gutter={[16, 16]}>
        {renderCards}
        </Row>
        

        <br/>

        {PostSize >= Limit &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={loadMorhander}>더보기</button>
        </div>
        }
        
        </div>
    )
}

export default LandingPage
