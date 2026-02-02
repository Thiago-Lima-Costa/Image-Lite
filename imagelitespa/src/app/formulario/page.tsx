'use client'

import { InputText, Template, Button, RenderIf, useNotification, FieldError, AuthenticatedPage } from '@/components';
import { useImageService } from '@/resources/image/image.service';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FormProps, formScheme, formValidatioScheme } from './formScheme';
import Link from 'next/link';


export default function FormularioPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();
    const notification = useNotification();

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidatioScheme
    })

    async function handleSubmit(dados: FormProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", dados.file);
        formData.append("name", dados.name);
        formData.append("tags", dados.tags);

        await service.salvar(formData);

        formik.resetForm();
        setImagePreview('');

        setLoading(false);

        notification.notify('Upload sent successfully!', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const file = event.target.files[0];
            formik.setFieldValue("file", file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className='flex flex-col items-center justify-center my-5'>
                    <h5 className='mt-3 mb-10 text-3x1 font-extrabold tracking-tight text-gray-900'>Nova Imagem</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-1'>
                            <label htmlFor="" className='block text-sm font-medium leading-6 text-gray-700'>Name: *</label>
                            <InputText
                                id='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="type the image's name" />
                            <FieldError error={formik.errors.name} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Tags: *</label>
                            <InputText
                                id='tags'
                                onChange={formik.handleChange}
                                value={formik.values.tags}
                                placeholder="type the tags comma separated" />
                            <FieldError error={formik.errors.tags} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label htmlFor="" className='block text-sm font-medium leading-6 text-gray-700'>Image: *</label>
                            <FieldError error={formik.errors.file} />
                            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                <div className='text-center'>

                                    <RenderIf condition={!imagePreview}>
                                        <svg className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd" />
                                        </svg>
                                    </RenderIf>

                                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                        <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>

                                            <RenderIf condition={!imagePreview}>
                                                <span>Click to upload</span>
                                            </RenderIf>

                                            <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} alt="" width={250} className='rounded-md' />
                                            </RenderIf>

                                            <input onChange={onFileUpload} type='file' className='sr-only' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 flex items-center justify-end gap-x-4'>
                            <Button style='bg-blue-500 hover:bg-blue-300' label='Save' type='submit' />
                            <Link href="/galeria">
                                <Button style='bg-red-500 hover:bg-red-300' label='Cancel' type='button' />
                            </Link>
                        </div>

                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}