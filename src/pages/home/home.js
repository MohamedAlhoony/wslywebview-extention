import React, { useState, useEffect } from 'react'
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Spinner,
    Alert,
} from 'react-bootstrap'
import { baseURI } from '../../config'
import { useParams, useNavigate } from 'react-router-dom'
import ItemTable from './itemTable/itemTable'
const getItemDetails = ({ itemID }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${baseURI}/D/ItemOrderPage?id=${itemID}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const sendSubmitForm = ({ itemID, phoneNumber, desc, qty, isDel }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        var urlencoded = new URLSearchParams()
        try {
            urlencoded.append('ItemID', itemID)
            urlencoded.append('Qty', qty)
            urlencoded.append('ClientTelNo', phoneNumber)
            urlencoded.append('Desciption', desc)
            urlencoded.append('IsDelivery', isDel)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow',
            }
            var response = await fetch(`${baseURI}/D/NewOrder`, requestOptions)
            const responseText = await response.text()
            const body = responseText ? JSON.parse(responseText) : ''
            if (response.status >= 200 && response.status < 300) {
                resolve()
            } else {
                reject(body)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const Home = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [qty, setQty] = useState('')
    const [desc, setDesc] = useState('')
    const [isDel, setIsDel] = useState(true)
    const [itemDetails, setItemDetails] = useState(null)
    const [isLoadingDetails, setIsLoadingDetails] = useState(false)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const [isLoadingErrorSubmit, setIsLoadingErrorSubmit] = useState(false)
    // const [errorMsg, setErrorMsg] = useState('')
    let { itemID } = useParams()
    const navigate = useNavigate()
    const submitForm = async () => {
        try {
            setIsLoadingErrorSubmit(false)
            setIsLoadingSubmit(true)
            await sendSubmitForm({ itemID, phoneNumber, desc, qty, isDel })
            navigate('/success')
            setIsLoadingSubmit(false)
        } catch (error) {
            console.log(error)
            // setErrorMsg(error)
            setIsLoadingErrorSubmit(true)
            setIsLoadingSubmit(false)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoadingDetails(true)
                let itemDetails = await getItemDetails({
                    itemID,
                })

                setItemDetails(itemDetails)
                setIsLoadingDetails(false)
            } catch (error) {
                navigate('/notFound')
                setIsLoadingDetails(false)
            }
        }
        getData()
    }, [itemID, navigate])

    return (
        <Container>
            {isLoadingDetails ? (
                <Row className={'py-5'}>
                    <Col className={'d-flex justify-content-center'}>
                        <Spinner
                            variant="primary"
                            animation="border"
                            role="status"
                        >
                            <span className="visually-hidden"></span>
                        </Spinner>
                    </Col>
                </Row>
            ) : (
                <Row className="d-flex justify-content-center py-3">
                    <Col xs={'12'} lg={'6'}>
                        <ItemTable itemDetails={itemDetails} />
                    </Col>
                </Row>
            )}
            {isLoadingErrorSubmit && (
                <Row className="d-flex justify-content-center ">
                    <Col xs={'12'} lg={'6'} className={'my-2'}>
                        <Alert variant="danger">
                            <h5>فشل تحميل البيانات</h5>
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row className="d-flex justify-content-center mb-5">
                <Col xs={'12'} lg={'6'}>
                    <Form>
                        {isLoadingSubmit && (
                            <div className={'submit_spinner_wrapper'}>
                                <Spinner animation="grow" variant="primary" />
                            </div>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>رقم الهاتف:</Form.Label>
                            <Form.Control
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="number"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>الكمية:</Form.Label>
                            <Form.Control
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                type="number"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>الوصف:</Form.Label>
                            <Form.Control
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                as={'textarea'}
                                type="text"
                                placeholder="الوصف"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check
                                checked={isDel}
                                onChange={(e) => setIsDel(e.target.checked)}
                                type="checkbox"
                                label="مع التوصيل"
                            />
                        </Form.Group>
                        <div className={'d-grid gap-2'}>
                            <Button
                                disabled={phoneNumber === '' || qty === ''}
                                variant="primary"
                                onClick={submitForm}
                            >
                                ارسال
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Home