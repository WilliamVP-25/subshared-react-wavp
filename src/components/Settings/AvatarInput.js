import React from 'react'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const AvatarInput = () => {
    const state = {
        loading: false,
    };
    const {loading, imageUrl} = state;

    const handleChange = info => {
        if (info.file.status === 'subiendo...') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'Listo') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader rounded-circle"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    );
}

export default AvatarInput