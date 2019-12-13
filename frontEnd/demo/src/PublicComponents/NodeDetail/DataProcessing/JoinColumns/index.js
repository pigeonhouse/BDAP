import React, { Component } from 'react';
import { withPropsAPI } from '@src';
import SelectJoinType from './SelectJoinType';
import OnFilter from './OnFilter';

class JoinColumns extends Component {

    render() {
        return (
            <div>
                <SelectJoinType></SelectJoinType>
                <OnFilter></OnFilter>
            </div>
        )
    }
}
export default withPropsAPI(JoinColumns);