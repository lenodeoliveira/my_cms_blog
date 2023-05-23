import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import DialogComponent from '../../ui-component/Dialog/DialogComponent';

const FormUploadFiles = ({ openDialog, setOpenDialog }) => {

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const account = useSelector((state) => state.account);


  const allowedMimes = (types) => {
    const mimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/jpg'
    ]
    if(mimes.includes(types)) {
      return true
    } 

    return false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    
    formData.append("image", selectedFile);

    let errorApi = null
    setError(null)

    const maxSize =  2 * 1024 * 1024
    const sizeImg = selectedFile.size

    const type = allowedMimes(selectedFile.type)

    if(!type) {
      setError('Formatos permitidos: jpeg, png, jpg')
      return
    }

    if(sizeImg > maxSize) {
      setError('Não é possível enviar uma imagem acima de 2mb')
      return
    }
    
    try {
      try {
        await axios({
          method: "post",
          url: "http://localhost:5050/api/upload/",
          data: formData,
          headers: { 
              "Content-Type": "multipart/form-data",
              'x-access-token': account.token
          },
        }).catch(function (error) {
          setError(error.response.data.error)
          errorApi = error.response.data.error
        })
          if(errorApi === null) {
            setOpenDialog(false)
          }
          setIsLoading(false)
      } catch (error) {
          setError(error.response.data.error)
          setIsLoading(false)
      }

  } catch (err) {
      console.log('ERROR', err)
      setError(err)
  }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleClose = () => setOpenDialog(false)

  return (
    <DialogComponent  title="Envia sua imagem!" open={openDialog} handleClose={handleClose}>
      <form onSubmit={handleSubmit} style={{marginBottom: '12px'}}>
        <input type="file" onChange={handleFileSelect}/>
        <Button disabled={selectedFile ? false : true }type="submit" className="btn btn-bordered btn-elevate btn-success" variant="contained">
              Upload Image
          </Button>
      </form>
      { error ? <span style={{color: '#f44336'}}>{error}</span> : null }
    </DialogComponent> 
  )
};

export default FormUploadFiles;