{{- define "full_app_name" -}}
    {{- printf "%s-%s" .Values.app_name .Values.environment_tag -}}
{{- end -}}