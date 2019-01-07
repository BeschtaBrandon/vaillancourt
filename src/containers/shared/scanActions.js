import { createAction } from "redux-actions";
import createRequestActionTypes from "./createRequestActionTypes";

export const scanActionTypes = {
  scanDelivery: createRequestActionTypes("SCAN_DELIVERY"),
  setScanOption: "SCAN_OPTION",
  removeScannedItemFromList: "REMOVE_SCANNED_ITEM_FROM_LIST",
  addScannedItemToList: "ADD_SCANNED_ITEM_TO_LIST",
  removeAllScannedItems: "REMOVE_ALL_SCANNED_ITEMS",
  isScanCollision: "IS_SCAN_COLLISION"
};

export default {
  scanDelivery: {
    request: createAction(scanActionTypes.scanDelivery.REQUEST),
    success: createAction(scanActionTypes.scanDelivery.SUCCESS),
    failure: createAction(scanActionTypes.scanDelivery.FAILURE)
  },
  setScanOption: createAction(scanActionTypes.setScanOption),
  removeScannedItemFromList: createAction(scanActionTypes.removeScannedItemFromList),
  addScannedItemToList: createAction(scanActionTypes.addScannedItemToList),
  removeAllScannedItems: createAction(scanActionTypes.removeAllScannedItems),
  isScanCollision: createAction(scanActionTypes.isScanCollision)
};
