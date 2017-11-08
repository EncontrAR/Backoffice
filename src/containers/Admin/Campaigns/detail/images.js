import React from 'react';
import ImageItem from '../../../../components/admin/lists/imageItem';
import Modal from '../../../../components/feedback/modal';
import { message, Input, Button, Row } from 'antd';
import campaignImagesActions from '../../../../redux/campaignImages/actions';
import { connect } from 'react-redux';

const MAX_LENGTH_URL = 200

const {
  showImages,
  addImage,
  deleteImage,
  clear,
  clearMsg
} = campaignImagesActions;

class CampaignImages extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			deleteModal: false,
			deleteImageId: null,
			url: ''
		}
	}

  componentWillMount() {
    this.props.showImages(this.props.campaignId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addImageSuccess) {
      message.success('La imagen fue añadida correctamente.')
    } else if (nextProps.addImageFailure) {
      message.error('La imagen no pudo ser añadida.')
    } else if (nextProps.removeImageSuccess) {
      message.success('La imagen fue borrada correctamente.')
    } else if (nextProps.removeImageFailure) {
      message.error('La imagen no pudo ser borrada.')
    }
    
    this.props.clearMsg()
  }

  componentWillUnmount() {
    this.props.clear()
  }

  handleAddImage = () => {
  	const url = this.state.url
  	if (url && url.length > 0) {
  		this.setState({ url: '' }, () => {
  			this.props.addImage(this.props.campaignId, url)
  		})
  	}
  	
  }

  handleDelete = (id) => {
  	console.log('El id es ' + id)
  	this.setState( { deleteModal: true, deleteImageId: id } )
  }

  handleConfirmDelete = () => {
  	const id = this.state.deleteImageId
  	this.setState( { deleteModal: false, deleteImageId: null }, () => {
  		this.props.deleteImage(this.props.campaignId, id)
  	})
  }

  handleCancelDelete = () => {
  	this.setState( { deleteModal: false, deleteImageId: null } )
  }

  handleInputChange(e) {
  	this.setState({ url: e.target.value })
  }

  renderModal() {
  	return (
      <Modal
        title="Borrar imagen"
        visible={ this.state.deleteModal }
        onOk={ this.handleConfirmDelete }
        onCancel={ this.handleCancelDelete }>
        <p>¿Estás seguro que querés borrar la imagen?</p>
    	</Modal>
  	)
  }

	renderImages() {
		if (this.props.images.length <= 0) {
			return ( 'No hay imágenes para esta campaña.' )
		} else {
		  return this.props.images.map((image, i) => {
		    return (
		      <ImageItem
		        id={image.id}
		        url={image.url}
		        index={i}
		        onDelete={ (id) => { this.handleDelete(id) } }
		      />
		    );
		  })
		}
	}

	render() {
		return (
			<div>
				<Row type='flex' justify='start'>
					<Input
						style={{ width: '50%', marginRight: '10px' }}
						maxLength={ MAX_LENGTH_URL }
						value={ this.state.url }
						onChange={ this.handleInputChange.bind(this) }
					/>
					<Button type="primary" onClick={ () => { this.handleAddImage() }}>Añadir imagen</Button>
				</Row>
				<br />
				<div className="isoSortableCardsContainer" type="flex" justify="start">
					<ul>
          	{ this.renderImages() }
          </ul>
				</div>
				{ this.renderModal() }
			</div>
		)
	}
}

CampaignImages.defaultProps = {
  images: []
};

function mapStateToProps(state) {
  const { images, addImageSuccess, addImageFailure, removeImageSuccess, removeImageFailure } = state.CampaignImage;
  console.dir(images)
  return {
    images: images,
    addImageSuccess: addImageSuccess,
    addImageFailure: addImageFailure,
    removeImageSuccess: removeImageSuccess,
    removeImageFailure: removeImageFailure
  };
}

export default connect(mapStateToProps, { showImages, addImage, deleteImage, clear, clearMsg })(CampaignImages);