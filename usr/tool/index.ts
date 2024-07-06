#!/usr/bin/env bun

/**
 * Adapted from and improved upon:
 * 
 * https://balamurugan16.hashnode.dev/blazingly-fast-cli-with-bun
 * 
 */

import './command.ts'
import { note_table_query } from './db'

// move this to a migrate command
// note_table_query.run()