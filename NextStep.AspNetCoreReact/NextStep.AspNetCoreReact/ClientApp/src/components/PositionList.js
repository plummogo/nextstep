import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Position';

class PositionList extends Component {

    constructor() {
        super();
        this.state = {};
        this.onPositionSelect = this.onPositionSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestPositions();
    }

    updateProperty(property, value) {
        let position = this.state.position;
        position[property] = value;
        this.setState({ position: position });
    }

    onPositionSelect(e) {
        this.newPosition = false;
        this.setState({
            displayDialog: true,
            position: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newPosition = true;
        this.setState({
            position: { name: '', location: '', organization: '', description: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.savePosition(this.state.position);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newPosition ? "Data Saved Successfully" : "Data Updated Successfully" });
    }

    delete() {
        this.props.deletePosition(this.state.position.id);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Open positions </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Close" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Delete" hidden={this.newPosition ? true : false} icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newPosition ? "Save" : "Update"} icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.positions} selectionMode="single" header={header} footer={footer} selection={this.state.selectedPosition} onSelectionChange={e => this.setState({ selectedPosition: e.value })} onRowSelect={this.onPositionSelect}>
                    <Column field="id" header="ID" />
                    <Column field="name" header="Name" />
                    <Column field="location" header="Location" />
                    <Column field="organization" header="Organization" />
                    <Column field="description" header="Description" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Position Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.position &&

                        <div className="p-grid p-fluid">

                            <div><label htmlFor="name">Name</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.position.name} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="location">Location</label></div>
                            <div>
                                <InputText id="location" onChange={(e) => { this.updateProperty('location', e.target.value) }} value={this.state.position.location} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="location">Organization</label></div>
                            <div>
                                <InputText id="organization" onChange={(e) => { this.updateProperty('organization', e.target.value) }} value={this.state.position.organization} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="location">Description</label></div>
                            <div>
                                <InputText id="description" onChange={(e) => { this.updateProperty('description', e.target.value) }} value={this.state.position.description} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make positions array available in props
function mapStateToProps(state) {
    return {
        positions: state.positions.positions,
        loading: state.positions.loading,
        errors: state.positions.errors,
        forceReload: state.positions.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PositionList);