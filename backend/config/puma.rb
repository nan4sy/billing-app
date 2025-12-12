# frozen_string_literal: true

max_threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)
min_threads_count = ENV.fetch("RAILS_MIN_THREADS", max_threads_count)
threads min_threads_count, max_threads_count

port ENV.fetch("PORT", 3000)
env = ENV.fetch("RAILS_ENV", "development")
environment env
workers ENV.fetch("WEB_CONCURRENCY", 0)
preload_app!

plugin :tmp_restart
