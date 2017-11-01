import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TagFilterField = ({ data, className, dispatch, onSelectTag, hintText, tags }) => {

    function filterSelected(ids) {
        return ids.map(id => data.tags.find(t => t.tagid === id));
    }

    function sortTagsByTitle(a, b) {
        let comparison = 0;
        if (a.title > b.title) {
            comparison = 1;
        } else if (a.title < b.title) {
            comparison = -1;
        }
        return comparison;
    }

    return (
        <SelectField
            multiple
            value={tags.map(t => t.tagid)}
            hintText={hintText}
            onChange={(event, key, ids) => dispatch(onSelectTag(filterSelected(ids)))}
            className={className}
        >
            {data.tags && data.tags.slice().sort(sortTagsByTitle).map(tag => (
                <MenuItem
                    key={tag.tagid}
                    insetChildren
                    checked={!!tags.find(t => t.tagid === tag.tagid)}
                    value={tag.tagid}
                    primaryText={tag.title}
                />
            ))}
        </SelectField>
    );
};

TagFilterField.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

const getTagsQuery = gql`
    query getTags {
        tags {
            title
            tagid
        }
    }
`;

const TagFilterFieldWithData = graphql(getTagsQuery)(TagFilterField);
export default connect()(TagFilterFieldWithData);
