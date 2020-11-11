import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from '../../firebase';
import FileUploader from "react-firebase-file-uploader";

import { ICategory, Values } from "../../interfaces";

const AddItem = () => {

    const [isUploading, setIsUploading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imageURL, setImageURL] = useState('')
    const [categories, setCategories] = useState<Array<ICategory>>([])

    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()

    const values: Values = {
        name: '',
        price: 1,
        stock: 1,
        category: '',
        description: '',
        image: '',
    }

    const validation = {
        name: Yup.string()
            .min(3, 'Name must be longer')
            .required('Name cannot be empty'),
        price: Yup.number()
            .min(0, 'Price cannot be 0')
            .required('Price cannot be empty'),
        stock: Yup.number()
            .min(0, 'Stock cannot be 0')
            .required('stock cannot be empty'),
        category: Yup.string()
            .min(3, 'Name must be longer')
            .required('Name cannot be empty'),
        description: Yup.string()
            .min(3, 'Name must be longer')
            .required('Name cannot be empty'),
    }

    useEffect(() => {
        async function getCategories() {
            let categories: Array<Object> = [];
            let categoriesFromLS = localStorage.getItem('categories')
            if (categoriesFromLS) {
                let categoriesArray = JSON.parse(categoriesFromLS)
                categories = categoriesArray
            } else {
                const caregoriesFromFirebase = await firebase.db.collection('categories').get()

                caregoriesFromFirebase.forEach(category => {
                    categories.push(category.data())
                })
                localStorage.setItem('categories', JSON.stringify(categories))

            }
            setCategories(categories)
        }
        getCategories()
    }, [firebase.db]);

    function handleUploadStart() {
        setIsUploading(true)
        setIsUploaded(false)
        setProgress(0)
    }
    function handleUploadError(error: Error) {
        setIsUploading(false)
        setIsUploaded(false)
        console.log(error)
    }
    function handleProgress(progress: number) {
        setProgress(progress)
        console.log(progress)
    }
    async function handleUploadSuccess(filename: string) {
        const url = await firebase.storage.ref('images').child(filename).getDownloadURL()
        setImageURL(url)
        setIsUploading(false)
        setIsUploaded(true)
    }


    return (
        <div>
            <nav className="flex justify-between items-center">
                <h2 className="text-3xl text-blue-800 font-bold">
                    New Item
                </h2>
                <Link to='/' className="bg-yellow-300 rounded px-4 py-2 text-black font-bold hover:bg-yellow-500">
                    Go back
                </Link>
            </nav>

            <Formik className="flex justify-center mt-5 h-full m-auto "
                initialValues={values} validationSchema={Yup.object().shape(validation)} onSubmit={async (item: Values) => {
                    item.image = imageURL
                    console.log(item)
                    await firebase.db.collection('items').add(item)
                    history.push('/')
                }}
            >
                {(props: FormikProps<Values>) => {
                    const { values, touched, errors, handleChange, handleBlur, isSubmitting } = props
                    return (
                        <Form className="m-auto max-w-xl shadow-2xl rounded-xl p-6 " >
                            <div className="w-full px-3 mb-2">
                                <label className="block text-indigo-500 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <Field type="text"
                                    className="border-b-2 px-3 w-full py-1 transition duration-500 ease-in-out focus:border-blue-300 focus:outline-none "
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {touched.name && errors.name ? (
                                    <div> {errors.name} </div>
                                ) : null}
                            </div>
                            <div className="w-full px-3 mb-2 hover:text-blue-500">
                                <label
                                    className="block text-indigo-500 text-sm font-bold mb-2 "
                                    htmlFor="price">Price</label>
                                <Field type="number" name="price"
                                    className="border-b-2 px-3 w-full py-1 transition duration-500 ease-in-out focus:border-blue-300 focus:outline-none "
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price} />
                                {touched.price && errors.price ? (
                                    <div> {errors.price} </div>
                                ) : null}
                            </div>
                            <div className="w-full px-3 mb-2">
                                <label
                                    className="block text-indigo-500 text-sm font-bold mb-2"
                                    htmlFor="stock">Stock</label>
                                <Field type="number" name="stock"
                                    className="border-b-2 w-full px-3 py-1 transition duration-500 ease-in-out focus:border-blue-300 focus:outline-none "
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stock}
                                />
                                {touched.stock && errors.stock ? (
                                    <div> {errors.stock} </div>
                                ) : null}
                            </div>
                            <div className="w-full px-3 mb-2">
                                <label
                                    className="block text-indigo-500 text-sm font-bold mb-2"
                                    htmlFor="category">Category</label>
                                <select name="category" className="border-b-2 w-full bg-blue-100 px-3 py-1 transition duration-500 ease-in-out focus:border-blue-300 focus:outline-none h-14"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}>
                                    <option value="">--Select a Category--</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}> {category.name} </option>
                                    ))}
                                </select>
                                {touched.category && errors.category ? (
                                    <div> {errors.category} </div>
                                ) : null}
                            </div>
                            <div className="w-full px-3 mb-2">
                                <label
                                    className="block text-indigo-500 text-sm font-bold mb-2"
                                    htmlFor="image">Image</label>
                                <FileUploader
                                    accept="image/*"
                                    name="image"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("images")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                                {isUploading ? (
                                    <div className="relative w-full border-2 my-4">
                                        <div className="bg-green-500 h-8 text-white font-bold flex items-center justify-center" style={{ width: `90%` }}>
                                            {progress}%
                                        </div>
                                    </div>
                                ) : null}
                                {isUploaded ? (
                                    <div className="relative w-full border-2 my-4">
                                        <div className="bg-green-500 h-8 text-white font-bold flex items-center justify-center w-full">
                                            Image uploaded
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div className="w-full px-3 mb-2">
                                <label
                                    className="block text-indigo-500 text-sm font-bold mb-2"
                                    htmlFor="description">Description</label>
                                <Field name="description"
                                    className="border-b-2 w-full px-3 py-1 transition duration-500 ease-in-out focus:border-blue-300 focus:outline-none h-14"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {touched.description && errors.description ? (
                                    <div> {errors.description} </div>
                                ) : null}
                            </div>

                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full py-2 bg-teal-600 rounded-md font-bold text-white cursor-pointer hover:bg-teal-800"
                            >
                                Save Item
                            </button>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default AddItem;