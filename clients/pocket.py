#
# pocketjs v1.1
# [http://anuv.me/pocketjs]
# Copyright: (c) 2017 Anuv Gupta
# File: pocket.js (pocketjs python client)
# Source: [https://github.com/anuvgupta/pocketjs]
# License: MIT [https://github.com/anuvgupta/pocketjs/blob/master/LICENSE.md]
#

# requires package 'websocket-client' v0.40.0 [https://pypi.python.org/pypi/websocket-client]
import websocket
import json

# websocket.enableTrace(True)

def Pocket():
    d = {
        'ws': None,
        'online': False,
        'id': 0,
        'address': '',
        'port': 0,
        'ev': {
            'open': (lambda : True),
            'run': (lambda : True),
            'close': (lambda : True)
        },
        'on': { }
    }

    p = { }
    def connect(domain, port, server, secure = False):
        if secure == True:
            secure = 's'
        else: secure = ''
        target = 'ws' + secure + '://' + domain + ':' + str(port) + '/' + server

        def on_message(ws, message):
            data = json.loads(message)
            if d['online'] and 'call' in data:
                if 'args' in data and len(data['args']) > 0:
                    p['callArr'](data['call'], data['args'])
                else: p['call'](data['call'])
            else:
                d['id'] = data['id']
                d['address'] = data['address']
                d['port'] = data['port']
                d['online'] = True
                print '[POCKET] connected'
                d['ev']['open']()

        def on_error(ws, error):
            print '[POCKET] error: ' + str(error)

        def on_close(ws):
            d['online'] = False
            print '[POCKET] disconnected'
            d['ev']['close']()

        def on_open(ws):
            print '[POCKET] connecting'
            d['ws'].send(Pocket.encode(json.dumps({ 'command': 'alive', 'id': p['getID']() })))

        d['ws'] = websocket.WebSocketApp(target, on_message = on_message, on_error = on_error, on_close = on_close)
        d['ws'].on_open = on_open
        d['ws'].run_forever()
        return p
    p['connect'] = connect

    def send(n, *a):
        if d['online']:
            data = { 'call': n }
            if len(a) > 0: data['args'] = a
            d['ws'].send(Pocket.encode(json.dumps(data)))
        else: print '[ERROR] pocket is offline/connecting - data cannot be sent'
        return p
    p['send'] = send

    def bind(n, f):
        if callable(f): d['on'][n] = f
        else: print '[ERROR] bind() requires parameter 2 to be a function'
        return p
    p['bind'] = bind

    def call(n, *a):
        if n in d['on']:
            if len(a) > 0:
                d['on'][n](*a)
            else: d['on'][n]()
        else: print "[ERROR] event '" + n + "' does not exist"
        return p
    p['call'] = call

    def callArr(n, a):
        if n in d['on']:
            d['on'][n](*a)
        else: print "[ERROR] event '" + n + "' does not exist"
        return p
    p['callArr'] = callArr

    def onOpen(*a):
        if len(a) > 0:
            if callable(a[0]):
                d['ev']['open'] = a[0]
            else: d['ev']['open'](*a)
        else: d['ev']['open']()
        return p
    p['onOpen'] = onOpen
    def onRun(*a):
        if len(a) > 0:
            if callable(a[0]):
                d['ev']['run'] = a[0]
            else: d['ev']['run'](*a)
        else: d['ev']['run']()
        return p
    p['onRun'] = onRun
    def onClose(*a):
        if len(a) > 0:
            if callable(a[0]):
                d['ev']['close'] = a[0]
            else: d['ev']['close'](*a)
        else: d['ev']['close']()
        return p
    p['onClose'] = onClose

    def close():
        d['ws'].close()
        return p
    p['close'] = close

    def isOnline():
        return d['online']
    p['online'] = isOnline
    def getID():
        return d['id']
    p['getID'] = getID
    def getAddress():
        return d['address']
    p['getAddress'] = getAddress
    def getPort():
        return d['port']
    p['getPort'] = getPort

    return p

Pocket.encode = lambda t : '~pocketjs~' + t + '~pocketjs~'
