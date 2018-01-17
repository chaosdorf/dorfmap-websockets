from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists

if not env.hosts:
    env.hosts = ['dorfmapserver.chaosdorf.dn42']
env.use_ssh_config = True

env.shell = '/bin/sh -c'

def deploy():
    with cd('/srv/dorfmap-websockets/dorfmap-websockets'):
        sudo('systemctl stop dorfmap-websockets.service')
        sudo('git pull', user='dorfmap-websockets')
        sudo('yarn')
        sudo('chown -R dorfmap-websockets .')
        sudo('systemctl start dorfmap-websockets.service')
        sudo('systemctl status dorfmap-websockets.service')
