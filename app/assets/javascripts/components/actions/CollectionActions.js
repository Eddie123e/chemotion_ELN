import alt from '../alt';
import CollectionsFetcher from '../fetchers/CollectionsFetcher';
import UIStore from '../stores/UIStore';
import Utils from '../utils/Functions';

class CollectionActions {
  takeOwnership(params) {
    return (dispatch) => { CollectionsFetcher.takeOwnership(params)
      .then((roots) => {
        dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  // TODO #2...centralized error handling maybe ErrorActions?
  fetchLockedCollectionRoots() {
    return (dispatch) => { CollectionsFetcher.fetchLockedRoots()
      .then((roots) => {
        dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  fetchUnsharedCollectionRoots() {
    return (dispatch) => { CollectionsFetcher.fetchUnsharedRoots()
      .then((roots) => {
        dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  fetchSharedCollectionRoots() {
    return (dispatch) => { CollectionsFetcher.fetchSharedRoots()
      .then((roots) => {
        dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  fetchRemoteCollectionRoots() {
    return (dispatch) => { CollectionsFetcher.fetchRemoteRoots()
      .then((roots) => {
        dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  createSharedCollections(params) {
    return (dispatch) => { CollectionsFetcher.createSharedCollections(params)
      .then(() => {
        dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  bulkUpdateUnsharedCollections(params) {
    return (dispatch) => { CollectionsFetcher.bulkUpdateUnsharedCollections(params)
      .then(() => {
        dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  updateSharedCollection(params) {
    return (dispatch) => { CollectionsFetcher.updateSharedCollection(params)
      .then(() => {
        dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  createUnsharedCollection(params) {
    return (dispatch) => { CollectionsFetcher.createUnsharedCollection(params)
      .then(() => {
        dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  createSync(params){
    return (dispatch) => { CollectionsFetcher.createSync(params)
      .then(() => {
        dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });};
  }

  downloadReportCollectionSamples(){
    const {currentCollection} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_samples?id=" + currentCollection.id});
  }

  downloadReportCollectionReactions(){
    const {currentCollection} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_reactions?id=" + currentCollection.id});
  }

  downloadReportCollectionWellplates(){
    const {currentCollection} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_wellplates?id=" + currentCollection.id});
  }

  downloadReport(tab){
    const {currentCollection} = UIStore.getState();

    Utils.downloadFile({contents: "api/v1/reports/excel?id=" + currentCollection.id +"&tab="+tab});
  }

  downloadReportWellplate(wellplateId){
    Utils.downloadFile({contents: "api/v1/reports/excel_wellplate?id=" + wellplateId});
  }

  downloadReportReaction(reactionId){
    Utils.downloadFile({contents: "api/v1/reports/excel_reaction?id=" + reactionId});
  }
}

export default alt.createActions(CollectionActions);
