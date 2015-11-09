Periods = new Meteor.Collection('periods');
Assets = new Meteor.Collection('assets');
Expenses = new Meteor.Collection('expenses');
AssetData = {};
ExpenseData = {};

  if (Meteor.isClient)
  {
    Template.addPeriodForm.helpers({
      periods: function() {
        return Periods.find();
      }
    });
    Template.addAssetForm.helpers({
      periods: function() {
        return Periods.find();
      }
    });
    Template.addExpenseForm.helpers({
      periods: function() {
        return Periods.find();
      }
    });
    Template.addPeriodForm.events({
      'submit form': function(event){
        var intCount = parseInt(Periods.find().count() + 1);
        var periodCodeVar = event.target.periodCode.value;
        Periods.insert({
          period_id : intCount,
          period_code: periodCodeVar
        });
      }
    });
    Template.addAssetForm.events({
      'submit form': function(event){
        var periodIdVar = parseInt(event.target.periodCode.value);  
        var assetCodeVar = event.target.assetCode.value;
        var assetAmountVar = event.target.assetAmount.value;
        
        Assets.insert({
          period_id : periodIdVar,
          asset_code: assetCodeVar,
          asset_amount: assetAmountVar
        });
      }
    });
    Template.addExpenseForm.events({
      'submit form': function(event){
        var periodIdVar = parseInt(event.target.periodCode.value);
        var expenseCodeVar = event.target.expenseCode.value;
        var expenseAmountVar = event.target.expenseAmount.value;
        
        Expenses.insert({
          period_id : periodIdVar,
          expense_code : expenseCodeVar,
          expense_amount : expenseAmountVar 
        });
      }
    });
    Template.findPeriodForm.helpers({
      periods: function() {
        return Periods.find();
      }
    });
    
    Template.findPeriodForm.events({
    'change #periodList': function(evt) {
        $("#assetTbl tr, #expenseTbl tr").remove();
        
        var totalAssets = 0;
        var totalExpenses = 0;
        var intSavings = 0;
        var thecode = $(evt.target).val();
        var periods = Periods.find({
          period_code : thecode
        }).fetch();
        
        
        periods.forEach(function(doc){
          periodId = doc.period_id;
          AssetData.periodId = doc.period_id;;
        });
        
        var assets = Assets.find({
            period_id : periodId
          }).fetch();
        AssetData = assets;

        $("#assetTbl, #expenseTbl").prepend("<thead><tr><th>Code</th><th>Amount (Php)</th></tr></thead>");
        
        /*assets.forEach(function(doc){
            $("#assetTbl").append("<tr data-id='" + doc.asset_code + "'><td>" + doc.asset_code + "</td><td>" + doc.asset_amount + "</td></tr>");
            totalAssets += parseInt(doc.asset_amount);
          });
        */

        var expenses = Expenses.find({
            period_id : periodId
          }).fetch();
        ExpenseData = expenses;        
        /*expenses.forEach(function(doc){
            $("#expenseTbl").append("<tr><td id='" + doc.period_id + "'>" + doc.expense_code + "</td><td>" + doc.expense_amount + "</td></tr>");
            totalExpenses += parseInt(doc.expense_amount);
          });
        */
        intSavings = totalAssets - totalExpenses;
        $("#savings").empty();
        $("#savings").append("<p><B>Php " + intSavings + "</B></p>");
      }
    });
    
    Template.assetForm.helpers({
      assetArr: function() {
        return $.map(AssetData, function(el) { return el });
      }
    });
    
    Template.assetForm.events({
      'click': function() {
        console.log(this._id);
      }
    });

    Template.expenseForm.helpers({
      expenseArr: function() {
        return $.map(ExpenseData, function(el) { return el });
      }
    });
    Template.expenseForm.events({
      'click': function() {
        console.log(this._id);
      }
    });

    Template.Navigation.events({
      'click #Overview': function() {
        $(".Overview").show();
        $(".findPeriod, .addPeriod, .addExpense, .addAsset").hide();
      },
      'click #Home': function() {
        $(".findPeriod").show();
        $(".Overview, .addPeriod, .addExpense, .addAsset").hide();
      },
      'click #Period': function() {
        $(".addPeriod").show();
        $(".Overview, .findPeriod, .addExpense, .addAsset").hide();
      },
      'click #Asset': function() {
          $(".addAsset").show();
          $(".Overview, .addPeriod, .addExpense, .findPeriod").hide();
      },
      'click #Expense': function() {
          $(".addExpense").show();
          $(".Overview, .addPeriod, .findPeriod, .addAsset").hide();
      }
    });
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


      