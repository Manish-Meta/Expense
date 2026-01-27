const { pgEnum } = require('drizzle-orm/pg-core');

const user_role_enum = pgEnum("user_role_enum", ["User", "Validator", "Admin"]);

const expense_next_level=pgEnum('expense_next_level',["User","Validator","Admin","Vendor","Finish"])

const tax_cal_method=pgEnum('tax_cal_method',['Tax Inclusive','Tax Exclusive'])

const pay_met=pgEnum('pay_met',['credit card','corporate card','bank transfer','cash'])

const dept=pgEnum('val_scopr',['ALL_DEPT','OWN_DEPT', 'ASSIGNED_TEAMS'])

const priority_level=pgEnum('priority_level',['standard validator','senior validator','lead validator'])

const exp_status=pgEnum('status',['Submited','Validated','Approved','Draft','Escalated','Needs-info','Paid','Pending','Rejected','Processing','Withdrawn'])

const compliance=pgEnum('compliance',['Compliant','Warning','Violation'])

const priority=pgEnum('priority',['Low','Medium','High'])

module.exports = {expense_next_level, user_role_enum ,tax_cal_method,pay_met,dept,priority_level,exp_status,compliance,priority};
