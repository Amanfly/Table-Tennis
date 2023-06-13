from .base import LOG_FILES_ROOT


log_rotation_config = {"interval": 15, "backupCount": 5}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        }
    },
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'info_file': {
            'level': 'INFO',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': str(LOG_FILES_ROOT) + '/info.logs',
            'when': 'D',
            'interval': log_rotation_config['interval'],
            'backupCount': log_rotation_config['backupCount'],
            'formatter': 'verbose',
        },
        'debug_file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': str(LOG_FILES_ROOT) + '/debug.logs',
            'when': 'D',
            'interval': log_rotation_config['interval'],
            'backupCount': log_rotation_config['backupCount'],
            'formatter': 'verbose',
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': str(LOG_FILES_ROOT) + '/error.logs',
            'when': 'D',
            'interval': log_rotation_config['interval'],
            'backupCount': log_rotation_config['backupCount'],
            'formatter': 'verbose',
        },
        'console': {
            'class': 'logging.StreamHandler',
        },
        'sql_console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'info': {
            'handlers': ['info_file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'debug': {
            'handlers': ['debug_file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'error': {
            'handlers': ['error_file', 'console'],
            'level': 'ERROR',
            'propagate': True,
        },
        'django.db.backends': {
            'level': 'DEBUG',
            'handlers': ['sql_console'],
        }
    },
}
