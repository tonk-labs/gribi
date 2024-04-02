// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "../../../src/IStore.sol";
import { StoreSwitch } from "../../../src/StoreSwitch.sol";
import { StoreCore } from "../../../src/StoreCore.sol";
import { Bytes } from "../../../src/Bytes.sol";
import { Memory } from "../../../src/Memory.sol";
import { SliceLib } from "../../../src/Slice.sol";
import { EncodeArray } from "../../../src/tightcoder/EncodeArray.sol";
import { FieldLayout, FieldLayoutLib } from "../../../src/FieldLayout.sol";
import { Schema, SchemaLib } from "../../../src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "../../../src/PackedCounter.sol";
import { ResourceId } from "../../../src/ResourceId.sol";
import { RESOURCE_TABLE, RESOURCE_OFFCHAIN_TABLE } from "../../../src/storeResourceTypes.sol";

// Import user types
import { ExampleEnum } from "./../common.sol";

ResourceId constant _tableId = ResourceId.wrap(
  bytes32(abi.encodePacked(RESOURCE_TABLE, bytes14("store"), bytes16("KeyEncoding")))
);
ResourceId constant KeyEncodingTableId = _tableId;

FieldLayout constant _fieldLayout = FieldLayout.wrap(
  0x0001010001000000000000000000000000000000000000000000000000000000
);

library KeyEncoding {
  /**
   * @notice Get the table values' field layout.
   * @return _fieldLayout The field layout for the table.
   */
  function getFieldLayout() internal pure returns (FieldLayout) {
    return _fieldLayout;
  }

  /**
   * @notice Get the table's key schema.
   * @return _keySchema The key schema for the table.
   */
  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _keySchema = new SchemaType[](6);
    _keySchema[0] = SchemaType.UINT256;
    _keySchema[1] = SchemaType.INT32;
    _keySchema[2] = SchemaType.BYTES16;
    _keySchema[3] = SchemaType.ADDRESS;
    _keySchema[4] = SchemaType.BOOL;
    _keySchema[5] = SchemaType.UINT8;

    return SchemaLib.encode(_keySchema);
  }

  /**
   * @notice Get the table's value schema.
   * @return _valueSchema The value schema for the table.
   */
  function getValueSchema() internal pure returns (Schema) {
    SchemaType[] memory _valueSchema = new SchemaType[](1);
    _valueSchema[0] = SchemaType.BOOL;

    return SchemaLib.encode(_valueSchema);
  }

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](6);
    keyNames[0] = "k1";
    keyNames[1] = "k2";
    keyNames[2] = "k3";
    keyNames[3] = "k4";
    keyNames[4] = "k5";
    keyNames[5] = "k6";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](1);
    fieldNames[0] = "value";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /**
   * @notice Get value.
   */
  function getValue(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    ExampleEnum k6
  ) internal view returns (bool value) {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Get value.
   */
  function _getValue(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    ExampleEnum k6
  ) internal view returns (bool value) {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Get value.
   */
  function get(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    ExampleEnum k6
  ) internal view returns (bool value) {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Get value.
   */
  function _get(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    ExampleEnum k6
  ) internal view returns (bool value) {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Set value.
   */
  function setValue(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6, bool value) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((value)), _fieldLayout);
  }

  /**
   * @notice Set value.
   */
  function _setValue(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6, bool value) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((value)), _fieldLayout);
  }

  /**
   * @notice Set value.
   */
  function set(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6, bool value) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((value)), _fieldLayout);
  }

  /**
   * @notice Set value.
   */
  function _set(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6, bool value) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((value)), _fieldLayout);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, ExampleEnum k6) internal {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack static (fixed length) data using this table's schema.
   * @return The static data, encoded into a sequence of bytes.
   */
  function encodeStatic(bool value) internal pure returns (bytes memory) {
    return abi.encodePacked(value);
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dyanmic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(bool value) internal pure returns (bytes memory, PackedCounter, bytes memory) {
    bytes memory _staticData = encodeStatic(value);

    PackedCounter _encodedLengths;
    bytes memory _dynamicData;

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    ExampleEnum k6
  ) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](6);
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));

    return _keyTuple;
  }
}

/**
 * @notice Cast a value to a bool.
 * @dev Boolean values are encoded as uint8 (1 = true, 0 = false), but Solidity doesn't allow casting between uint8 and bool.
 * @param value The uint8 value to convert.
 * @return result The boolean value.
 */
function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}

/**
 * @notice Cast a bool to a bytes32.
 * @dev The boolean value is casted to a bytes32 value with 0 or 1 at the least significant bit.
 */
function _boolToBytes32(bool value) pure returns (bytes32 result) {
  assembly {
    result := value
  }
}