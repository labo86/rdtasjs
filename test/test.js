import * as lib from '../src/index.js';
import {expect} from "@jest/globals";

test('object_to_search_params empty', () => {

  let actual = lib.objectToSearchParams({});

  expect(actual).toEqual('');
});

test('object_to_search_params one value', () => {

  let actual = lib.objectToSearchParams({ 'key' : 'value'});

  expect(actual).toEqual('key=value');
});

test('object_to_search_params many values', () => {

  let actual = lib.objectToSearchParams({ 'key' : 'value', 'key2' : 'value2'});

  expect(actual).toEqual('key=value&key2=value2');
});

test('add form object override', () => {
  document.body.innerHTML = "<form id='test'><input type='hidden' name='key' value='value'/></form>";

  let form = new FormData(document.forms[0]);
  lib.formAddParams(form, {'key': 'value2'});
  expect(form.get('key')).toEqual('value2');
});

test('add form object one', () => {
  document.body.innerHTML = "<form id='test'><input type='hidden' name='key' value='value'/></form>";

  let form = new FormData(document.forms[0]);
  lib.formAddParams(form, {'key2': 'value2'});
  expect(form.get('key')).toEqual('value');
  expect(form.get('key2')).toEqual('value2');
});

test('add form object many', () => {
  document.body.innerHTML = "<form id='test'><input type='hidden' name='key' value='value'/></form>";

  let form = new FormData(document.forms[0]);
  lib.formAddParams(form, {'key2': 'value2', 'key3': 'value3'});
  expect(form.get('key')).toEqual('value');
  expect(form.get('key2')).toEqual('value2');
  expect(form.get('key3')).toEqual('value3');
});