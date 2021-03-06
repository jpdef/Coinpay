from gluon.tools import Auth

db =DAL("sqlite://storage.sqlite",adapter_args=dict(foreign_keys=False))
auth = Auth(db)
auth.settings.extra_fields['auth_user'] = [Field('recv_addr')]
auth.define_tables(username=True)

db.define_table('vendor',
     Field('recv_addr','string'),
     Field('name', 'string'))

db.define_table('exchange',
    Field('value','double'),
    Field('time','integer'),
    Field('vendor_id','integer'))

db.define_table('products',
    Field('name','string'),
    Field('value','double'))

db.define_table('rates',
    Field('value','double'),
    Field('time','datetime'))
