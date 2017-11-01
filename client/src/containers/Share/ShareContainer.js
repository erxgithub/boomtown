import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { withRouter } from 'react-router-dom';

import { FirebaseStorage, FirebaseAuth } from '../../config/firebase';

import {
    nextShareItemFormStep,
    prevShareItemFormStep,
    resetShareItemForm,
    setItemImageUrl,
    startImageUpload,
} from '../../redux/modules/share';

import Share from './Share';

import { itemsQuery } from '../Items/ItemsContainer';

const validate = values => {
    const errors = {};
    const requiredFields = ['itemTitle', 'itemDescription', 'itemCategoryTags'];
    requiredFields.forEach(field => {
        if (!values[field] || !values[field].length) {
            errors[field] = 'This field is required.';
        }
    });
    return errors;
};

class ShareContainer extends Component {

    componentWillUnmount() {
        this.props.dispatch(resetShareItemForm());
    }

    handleNext = () => {
        const { stepIndex } = this.props;
        this.fileInput = undefined;
        this.props.dispatch(nextShareItemFormStep({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        }));
    }

    handlePrev = () => {
        const { stepIndex } = this.props;
        if (stepIndex > 0) {
            this.props.dispatch(prevShareItemFormStep({
                stepIndex: stepIndex - 1,
                finished: stepIndex >= 2
            }));
        }
    }

    selectImage = (fileInput) => {
        this.fileInput = this.fileInput || fileInput;
        this.fileInput.click();
    }

    handleImageUpload = () => {
        
        const cloud = FirebaseStorage.ref();
        const userid = FirebaseAuth.currentUser.uid;
        const fileName = this.fileInput.files[0].name;

        this.props.dispatch(startImageUpload());

        cloud.child(`images/${userid}/${fileName}`)
            .put(this.fileInput.files[0])
            .then(result => {
                this.props.dispatch(setItemImageUrl(result.metadata.downloadURLs[0]));
                this.handleNext();
            }).catch(() => {
                // TODO
            })
    }

    handleSubmit = () => {
        const {
            title,
            description,
            itemCategoryTags,
        } = this.props.itemData;


        const tags = itemCategoryTags.map(t => ({ title: t.title, tagid: t.tagid }));
        const ownerid = FirebaseAuth.currentUser.uid;
        const imageurl = this.props.shareImageURL;


        if (this.props.valid) {
            this.props.saveNewItem({ title, imageurl, ownerid, description, tags })
            .then(() => {
                this.props.history.push('/');
            });
        }
    }

    reset = () => {
        this.props.dispatch(resetShareItemForm({
            stepIndex: 0,
            finished: false
        }));
        this.props.reset();
    }

    render() {
        const {
            stepIndex,
            finished,
            userProfile,
            categoryFilters,
            invalid,
            submitting,
            uploadingImage,
            data,
            ...props
        } = this.props;
        return (
            <Share
                {...props}
                handlePrev={() => this.handlePrev()}
                handleNext={() => this.handleNext()}
                selectImage={(fileInput) => this.selectImage(fileInput)}
                handleImageUpload={() => this.handleImageUpload()}
                handleSubmit={() => this.handleSubmit()}
                reset={this.reset}
                invalid={invalid}
                submitting={submitting}
                uploadingImage={uploadingImage}
                userProfile={userProfile}
                stepIndex={stepIndex}
                finished={finished}
            />
        );
    }
}

const submitItemMutation = gql`
    mutation AddItem(
        $title: String!, 
        $description: String,
        $ownerid: String!
        $imageurl: String
        $tags: [AssignedTag]!
    ) {
        addItem(
            title: $title
            imageurl: $imageurl
            ownerid: $ownerid
            description: $description
            tags: $tags
        ) {
            itemid
        }
    }
`;

const mapStateToProps = state => ({
    stepIndex: state.share.form.stepIndex,
    finished: state.share.form.finished,
    shareImageURL: state.share.upload.url,
    uploadingImage: state.share.upload.uploading,
    itemData: getFormValues('ShareItemForm')(state) || {},
    userProfile: state.auth.userProfile
});

const ShareItemForm = reduxForm({
    form: 'ShareItemForm',
    validate
})(ShareContainer);

const ShareItemFormWithData = compose(
    graphql(submitItemMutation, {
        props: ({ mutate }) => ({
            saveNewItem: ({ title, imageurl, ownerid, description, tags }) => mutate({
                variables: { title, imageurl, ownerid, description, tags }
            })
        }),
        options: ownProps => ({
            refetchQueries: [{
                query: itemsQuery
            }]
        })
    })
)(ShareItemForm);

export default connect(mapStateToProps)(withRouter(ShareItemFormWithData));
