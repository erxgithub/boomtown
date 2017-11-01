import React from 'react';
import { connect } from 'react-redux';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import { Field } from 'redux-form';

import { FirebaseAuth } from '../../config/firebase';

import TagFilterField from '../../components/TagFilterField/';
import ItemCard from '../../components/ItemCard/';
import ValidatedTextField from '../../components/ValidatedTextField/';

import {
    selectShareItemCategory
} from '../../redux/modules/share';

import './styles.css';

const Share = ({
    // finished,
    // reset,
    invalid,
    submitting,
    stepIndex,

    userProfile,
    shareImageURL,
    itemData,
    tags,

    selectImage,
    handleImageUpload,
    uploadingImage,
    handlePrev,
    handleNext,
    handleSubmit
 }) => {
    let uploadInput = false;
    return (
        <div className="shareFormContainer">
            <div className="shareFormLeft">
                <div className="shareCardContainer">
                    <ItemCard
                        itemData={{
                            id: 1,
                            title: itemData.title || 'Amazing Item Title',
                            description: itemData.description || 'Profound item description.',
                            imageurl: shareImageURL || '',
                            tags: tags || [],
                            itemowner: {
                                userid: FirebaseAuth.currentUser.uid,
                                email: userProfile.email
                            },
                            created: new Date().toString(),
                            borrower: null,
                        }}
                    />
                </div>
            </div>
            <form className="shareFormRight" autoComplete="off">
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel className="stepLabel">Add an Image</StepLabel>
                        <StepContent>
                            <p className="stepDescription">
                                We live in a visual culture. Upload an image of the item you are sharing.
                            </p>
                            { uploadingImage ? <LinearProgress mode="indeterminate" color="white" /> :
                            <div>
                                <RaisedButton
                                    label="Select an Image"
                                    onClick={() => selectImage(uploadInput)}
                                />
                                <input
                                    onChange={handleImageUpload}
                                    ref={(input) => { uploadInput = input; }}
                                    hidden
                                    type="file"
                                    id="input"
                                />
                                <div>
                                    <RaisedButton
                                        className="stepButton"
                                        label={'Next'}
                                        disableTouchRipple
                                        disableFocusRipple
                                        onTouchTap={handleNext}
                                        disabled={!shareImageURL}
                                    />
                                </div>
                            </div>
                            }
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel className="stepLabel">Add a Title & Description</StepLabel>
                        <StepContent>
                            <p className="stepDescription">Folks need to know what you are sharing. Give them a clue by adding a title & description.</p>
                            <Field
                                name="title"
                                label="Title"
                                type="text"
                                component={ValidatedTextField}
                                floatingLabelFocusStyle={{ color: 'white' }}
                            />
                            <Field
                                name="description"
                                label="Description"
                                type="text"
                                component={ValidatedTextField}
                                multiLine
                                rows={4}
                                floatingLabelFocusStyle={{ color: 'white' }}
                            />
                            <div>
                                <RaisedButton
                                    className="stepButton"
                                    label={'Next'}
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handleNext}
                                    disabled={invalid}
                                />
                                <RaisedButton
                                    label="Back"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handlePrev}
                                    secondary
                                    disabled={false}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel className="stepLabel">Categorize Your Item</StepLabel>
                        <StepContent>
                            <p className="stepDescription">
                                To share an item, you will add it to our list of categories. You can select multiple categories.
                            </p>

                            <Field
                                name="itemCategoryTags"
                                type="select"
                                component={(fieldProps) => (
                                    <TagFilterField
                                        {...fieldProps}
                                        tags={tags}
                                        hintText={'Select Category Tags'}
                                        onSelectTag={selectShareItemCategory}
                                    />
                                    )
                                }
                            />
                            <div>
                                <RaisedButton
                                    className="stepButton"
                                    label={'Next'}
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handleNext}
                                    disabled={invalid}
                                />
                                <RaisedButton
                                    label="Back"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handlePrev}
                                    secondary
                                    disabled={false}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel className="stepLabel">Confirm Things!</StepLabel>
                        <StepContent>
                            <p className="stepDescription">
                                Great! If you are happy with everything, tap the button.
                            </p>
                            <div>
                                <RaisedButton
                                    className="stepButton"
                                    label={'Confirm'}
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handleSubmit}
                                    disabled={invalid || submitting}
                                />
                                <RaisedButton
                                    label="Back"
                                    disableTouchRipple
                                    disableFocusRipple
                                    onTouchTap={handlePrev}
                                    secondary
                                />
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    tags: state.share.form.categoryFilters,
});

export default connect(mapStateToProps)(Share);
