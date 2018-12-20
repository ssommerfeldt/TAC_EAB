/* eslint-disable */
define('spec/Fields/RecurrencesField.spec', [
  'Mobile/SalesLogix/Fields/RecurrencesField'
], function(RecurrencesField) {
  return describe('Mobile/SalesLogix/Fields/RecurrencesField', function() {
    it('can set text', function() {
      var field = new RecurrencesField();
      field.setText('test');
      expect(field.inputNode.innerHTML)
        .toEqual('test');
    });
  });
});
